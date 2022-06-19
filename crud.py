from model import User, Gift, Hobby, UserHobby, Question, Answer, Liked
from model import connect_to_db, db


def get_gifts(gender, age, price, hobby_ids):
    """get gift list from users' criteria"""
    hobby_ids_int = list(map(int, hobby_ids))

    return Gift.query.filter(Gift.gender == gender, Gift.age == age, 
                            Gift.price == price, Gift.hobby_id.in_(hobby_ids_int)).all()

def get_user_by_email(email):
    """Check if user object with this username exists"""

    return User.query.filter(User.email == email).first() 

def create_user(email, password, username, gender, age, hobby_ids):
    """Create and return a new user."""
    hobby_ids_int = list(map(int,hobby_ids))
    hobbies_objects = Hobby.query.filter(Hobby.hobby_id.in_(hobby_ids_int)).all()
    user = User(email=email, password=password, username=username, gender=gender,
                age=age, hobbies=hobbies_objects)

    return user

def get_question_by_user(user):
    """get the questions from user"""
    return user.questions
    
def get_hobby_name_from_hobby_object(hobbies):
    """get hobby name list from hobby objects"""
    hobby_names = []
    for hobby in hobbies:
        hobby_names.append(hobby.hobby_name)
    return hobby_names

def create_question(user,gender,age,price,hobby_name,question_type):
    """create a new question"""
    return Question(user=user,gender=gender,age=age,price=price,hobby=hobby_name,question_type=question_type)

def get_all_questions():
    """get all questions from question table"""
    return Question.query.all()

def get_answers_by_question(question_id)
    """get all answers by question id"""
    return Answer.query.filter(Answer.question_id==question_id).all()

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
