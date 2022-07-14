"""Server for movie ratings app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import User, Gift, Hobby, UserHobby, Question, Answer, Liked
from model import connect_to_db, db
import crud
import os
from jinja2 import StrictUndefined
import requests

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("homepage.html")


@app.route('/login', methods=['POST'])
def login():
    """ Log user in and get user info. """
    email = request.get_json().get('email')
    password = request.get_json().get('password')
   
    user = crud.get_user_by_email(email)
    
    if not user or user.password != password:
        return jsonify({"success": False})
    else:
        session['user_email'] = user.email
        return jsonify({"success": True, "user": user.username})

@app.route('/signup')
def create_account():
    """Create new account."""

    return render_template("signup.html")

@app.route('/register', methods=["POST"])
def register_user():
    """Create a new user."""    
    
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    gender = request.form.get('gender')
    age = request.form.get('age')
    hobby_ids = request.form.getlist('hobby')

    user = crud.get_user_by_email(email)

    if user:
        flash("This email is already in use, please try again.")
    else:
        new_user = crud.create_user(email, password, username, gender, age, hobby_ids)
        db.session.add(new_user)
        db.session.commit()
        flash("Account successfully created! Please log in.")
    
    return redirect('/')

@app.route('/logout')
def logout():
    session.pop('user_email', None)
    
    return redirect('/')

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/user")
def user():     
    email=session['user_email']
    user = crud.get_user_by_email(email)
    username = user.username
    gender = user.gender
    age = user.age
    hobbies = crud.get_hobby_name_from_hobby_object(user.hobbies)

    questions_object = crud.get_question_by_user(user)
    questions = []
    for question in questions_object:
        questions.append(question.to_dict())

    answers_object = crud.get_answer_by_user(user)
    answers=[]
    for answer in answers_object:
        answers.append({"id": answer.answer_id,
                        "gender": answer.question.gender,
                        "age": answer.question.age,
                        "hobby": answer.question.hobby,
                        "price": answer.question.price,
                        "gift": answer.gift.gift_name
                        })
    
    likes_object = crud.get_like_by_user(user)
    likes=[]
    for like in likes_object:
        likes.append({"id": like.liked_id,
                      "gender":like.answer.question.gender,
                      "age":like.answer.question.age,
                      "hobby":like.answer.question.hobby,
                      "price":like.answer.question.price,
                      "gift":like.answer.gift.gift_name
                      })

    return jsonify({"success": True, 
                    "user":{"username": username, "email": email, "gender": gender, 
                            "age":age, "hobbies": hobbies, "questions": questions, 
                            "answers": answers, "likes": likes}})
   

@app.route("/ask")
def react():

    return render_template("questions.html")

@app.route("/search")
def search_react():

    return render_template("search_results.html")

@app.route("/questions", methods=['POST'])
def add_new_question():
    logged_in_email = session.get("user_email")
    gender = request.get_json().get('gender')
    age = request.get_json().get('age')
    price = int(request.get_json().get('price'))
    hobby_name = request.get_json().get('hobby')

    if logged_in_email is None:
       
        return jsonify({"success": False, "message":"Please log in to ask a question."})
    
    else:
        user = crud.get_user_by_email(logged_in_email)
        question_type = True
        new_question = crud.create_question(user,gender,age,price,hobby_name,question_type)
        status = new_question[1]
        if status == True:
            db.session.add(new_question[0])
            db.session.commit()

        return jsonify({"success": True, "status": status,
                        "questionAdded": new_question[0].to_dict()})
        
@app.route("/questions")
def get_all_questions_answers():
    questions = []
    for question in Question.query.all():
        questions.append(question.to_dict())

    return jsonify({"success": True, "questions": questions})

@app.route("/answers", methods=['POST'])
def add_new_answer():
    logged_in_email = session.get("user_email")
    gift_name_input = request.get_json().get('answer')
    question_id = request.get_json().get('questionId')
    gift_name = gift_name_input.title()
    
    if logged_in_email is None:
        return jsonify({"success": False, "message":"Please log in to answer a question."})

    else:
        user = crud.get_user_by_email(logged_in_email)
        new_answer = crud.create_answer(user,gift_name,question_id)

        db.session.add(new_answer)
        db.session.commit()

        return jsonify({"success": True, "answerAdded": new_answer.answer_id})

@app.route("/likes", methods=['POST'])
def add_new_like():
    logged_in_email = session.get("user_email")
    answer_id = request.get_json().get('answerId')
    
    if logged_in_email is None:
        return jsonify({"success": False, "message":"Please log in to like an answer."})
    
    else:
        user = crud.get_user_by_email(logged_in_email)
        new_like = crud.create_like(user,answer_id)

        if new_like == False:
            return jsonify({"success": True, "history": True})
        else:
            db.session.add(new_like)
            db.session.commit()

            return jsonify({"success": True, "likeNum": new_like.answer.num_likes})

@app.route("/likes", methods=['GET'])
def like():
    logged_in_email = session.get("user_email")
    answer_id = request.args.get('answerId')
    print("\n"*10,logged_in_email, answer_id)
    if logged_in_email is None:
        return jsonify({"success": False})
    
    else:
        user = crud.get_user_by_email(logged_in_email)
        like_info = crud.get_likeinfo_by_user_answer(user,answer_id)

        return jsonify({"success": True, "history": like_info})

# API_KEY = os.environ['AMAZON_KEY']
# URL = "https://amazon-products1.p.rapidapi.com/search"

# HEADERS = {
# 	"X-RapidAPI-Key": API_KEY,
# 	"X-RapidAPI-Host": "amazon-products1.p.rapidapi.com"
# }

@app.route("/search", methods=['POST'])
def search():
    filter_results = [{
                "id": 1,
                "title": "Learnabee Toys for 2 Year Old Boys/Girls",
                "image" : "https://m.media-amazon.com/images/I/71INgaJBopS._AC_UL320_.jpg",
                "full_link" : "https://www.amazon.com/dp/B0995PKH6Q/?psc=1",
                "price" : 28.99,
            },
            {
                 "id": 2,
                "title": "Love&Mini Piano Toy Keyboard for Kids Birthday Gift",
                "image" : "https://m.media-amazon.com/images/I/71GvA+dZluS._AC_UL320_.jpg",
                "full_link" : "https://www.amazon.com/dp/B01IOFPJAS/?psc=1",
                "price" : 25.86,
            },{
                "id": 3,
                "title": "Learnabee Toys for 2 Year Old Boys/Girls",
                "image" : "https://m.media-amazon.com/images/I/71INgaJBopS._AC_UL320_.jpg",
                "full_link" : "https://www.amazon.com/dp/B0995PKH6Q/?psc=1",
                "price" : 28.99,
            },
            {
                 "id":4,
                "title": "Love&Mini Piano Toy Keyboard for Kids Birthday Gift",
                "image" : "https://m.media-amazon.com/images/I/71GvA+dZluS._AC_UL320_.jpg",
                "full_link" : "https://www.amazon.com/dp/B01IOFPJAS/?psc=1",
                "price" : 25.86,
            }]
    # gender = request.get_json().get('gender')
    # age = request.get_json().get('age')
    # price = int(request.get_json().get('price'))
    # hobby_name = request.get_json().get('hobby')

    # querystring = {"country":"US","query":f"gift+{gender}+{age}+year+old+{hobby_name}"}
    # response = requests.request("GET", URL, headers=HEADERS, params=querystring).json()
    # results = response['results'] 
    # filter_results = []

    # id=0
    # for result in results:
    #     if result["prices"]["current_price"] <= price:
    #         id += 1
    #         filter_results.append({
    #             "id": id,
    #             "title": result["title"],
    #             "image" : result["image"],
    #             "full_link" : result["full_link"],
    #             "price" : result["prices"]["current_price"]
    #         })

    return jsonify({"success": True, "searchResults": filter_results})

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
