"""Server for movie ratings app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import User, Gift, Hobby, UserHobby, Question, Answer, Liked
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("homepage.html")

@app.route("/search")
def search():
    """View search page."""

    return render_template("search.html")

@app.route("/result", methods=['POST'])
def search_result():
    """View search result."""
    gender = request.form.get('gender')
    age = request.form.get('age')
    price = int(request.form.get('price'))
    hobby_ids = request.form.getlist('hobby')
    gifts = crud.get_gifts(gender, age, price, hobby_ids)

    return render_template("result.html", gifts=gifts, age=age, gender=gender,price=price)

@app.route('/login', methods=['POST'])
def login():
    """ Log user in and get user info. """
    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")

    else:
        # Log in user by storing the user's id in session
        session['user_email'] = user.email
        flash(f"Welcome back, {user.username}!")

    return redirect('/')

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
def user_profile():
    email=session['user_email']
    user = crud.get_user_by_email(email)
    username = user.username
    gender = user.gender
    age = user.age
    hobbies = crud.get_hobby_name_from_hobby_object(user.hobbies)
    questions = crud.get_question_by_user(user)

    return render_template("profile.html", email=email, username=username, gender=gender, 
                                            age=age, hobbies=hobbies,questions=questions)

@app.route("/ask")
def ask_page():
    """View Ask page."""

    return render_template("ask.html")

@app.route("/answers")
def answer_page():
    """View answer page."""
    questions = crud.get_all_questions()
    question_answer_list = []
    for question in questions:
        answers = crud.get_answers_by_question(question.question_id)
        question_answer_list.append(answers)
    
    index_list=range(len(questions))
    return render_template("questions-and-answers.html",questions=questions,answers=question_answer_list,index_list=index_list)

@app.route("/post-question", methods=['POST'])
def question_info():
    """Create a new question."""

    logged_in_email = session.get("user_email")
    gender = request.form.get('gender')
    age = request.form.get('age')
    price = int(request.form.get('price'))
    hobby_name = request.form.get('hobby')

    if logged_in_email is None:
        flash("You must log in to ask a question.")
    elif not gender or not age or not price or not hobby_name:
        flash("Please select your requirements.")
    else:
        user = crud.get_user_by_email(logged_in_email)
        question_type = True
        new_question = crud.create_question(user,gender,age,price,hobby_name,question_type)
        db.session.add(new_question)
        db.session.commit()

        flash(f"You post a question!")

        questions = crud.get_all_questions()
        question_answer_list = []
        for question in questions:
            answers = crud.get_answers_by_question(question.question_id)
            question_answer_list.append(answers)
    
    index_list=range(len(questions))
    return render_template("questions-and-answers.html",questions=questions,answers=question_answer_list,index_list=index_list)

@app.route("/answer/<question_id>", methods=['POST'])
def answer(question_id):
    """Create a new answer."""

    logged_in_email = session.get("user_email")
    gift_name = request.form.get('gift_name')
    
    if logged_in_email is None:
        flash("You must log in to answer a question.")
    elif not gift_name:
        flash("Please give your answer.")
    else:
        user = crud.get_user_by_email(logged_in_email)
        new_answer = crud.create_answer(user,gift_name,question_id)
        
        db.session.add(new_answer)
        db.session.commit()

        flash(f"You post an answer!")

    return render_template("your_answer.html",answer=new_answer)

@app.route("/like/<answer_id>", methods=['POST'])
def likes(answer_id):
    """Create a new like."""

    logged_in_email = session.get("user_email")
    user_like = request.form.get("user_like")

    if logged_in_email is None:
        flash("You must log in to like an answer.")
    elif not user_like:
        flash("Please like an answer.")
    else:
        user = crud.get_user_by_email(logged_in_email)
        new_like = crud.create_like(user,answer_id)
        
        db.session.add(new_like)
        db.session.commit()

        flash(f"You liked an answer!")

    return render_template("your_like.html",like=new_like)

# @app.route("/share")
# def ask():
#     """View Ask page."""

#     return render_template("ask.html")

# @app.route("/movies")
# def all_movies():
#     """View all movies."""

#     movies = Movie.all_movies()

#     return render_template("all_movies.html", movies=movies)


# @app.route("/movies/<movie_id>")
# def show_movie(movie_id):
#     """Show details on a particular movie."""

#     movie = Movie.get_by_id(movie_id)

#     return render_template("movie_details.html", movie=movie)


# @app.route("/users")
# def all_users():
#     """View all users."""

#     users = User.all_users()

#     return render_template("all_users.html", users=users)


# @app.route("/users", methods=["POST"])
# def register_user():
#     """Create a new user."""

#     email = request.form.get("email")
#     password = request.form.get("password")

#     user = User.get_by_email(email)
#     if user:
#         flash("Cannot create an account with that email. Try again.")
#     else:
#         user = User.create(email, password)
#         db.session.add(user)
#         db.session.commit()
#         flash("Account created! Please log in.")

#     return redirect("/")


# @app.route("/users/<user_id>")
# def show_user(user_id):
#     """Show details on a particular user."""

#     user = User.get_by_id(user_id)

#     return render_template("user_details.html", user=user)


# @app.route("/login", methods=["POST"])
# def process_login():
#     """Process user login."""

#     email = request.form.get("email")
#     password = request.form.get("password")

#     user = User.get_by_email(email)
#     if not user or user.password != password:
#         flash("The email or password you entered was incorrect.")
#     else:
#         # Log in user by storing the user's email in session
#         session["user_email"] = user.email
#         flash(f"Welcome back, {user.email}!")

#     return redirect("/")

# @app.route("/update_rating", methods=["POST"])
# def update_rating():
#     rating_id = request.json["rating_id"]
#     updated_score = request.json["updated_score"]
#     Rating.update(rating_id, updated_score)
#     db.session.commit()

#     return "Success"

# @app.route("/movies/<movie_id>/ratings", methods=["POST"])
# def create_rating(movie_id):
#     """Create a new rating for the movie."""

#     logged_in_email = session.get("user_email")
#     rating_score = request.form.get("rating")

#     if logged_in_email is None:
#         flash("You must log in to rate a movie.")
#     elif not rating_score:
#         flash("Error: you didn't select a score for your rating.")
#     else:
#         user = User.get_by_email(logged_in_email)
#         movie = Movie.get_by_id(movie_id)

#         rating = Rating.create(user, movie, int(rating_score))
#         db.session.add(rating)
#         db.session.commit()

#         flash(f"You rated this movie {rating_score} out of 5.")

#     return redirect(f"/movies/{movie_id}")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)
