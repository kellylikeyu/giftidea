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

def get_answer_by_user(user):
    """get the questions from user"""
    return Answer.query.filter(Answer.user_id==user.user_id).all()

def get_like_by_user(user):
    """get the questions from user"""
    return user.likes
    
def get_hobby_name_from_hobby_object(hobbies):
    """get hobby name list from hobby objects"""
    hobby_names = []
    for hobby in hobbies:
        hobby_names.append(hobby.hobby_name)
    return hobby_names

def create_question(user,gender,age,price,hobby_name,question_type):
    """create a new question, if the same question exist, return None"""
    if len(Question.query.filter(Question.gender==gender,Question.age==age,
                                Question.price==price,Question.hobby==hobby_name,
                                Question.question_type==question_type).all()) == 0:
        return [Question(user_id=user.user_id,gender=gender,age=age,price=price,
                hobby=hobby_name,question_type=question_type), True]
    else:
        return [Question.query.filter(Question.gender==gender,Question.age==age,
                                Question.price==price,Question.hobby==hobby_name,
                                Question.question_type==question_type).one(), False]

def get_all_questions():
    """get all questions from question table"""
    return Question.query.all()

def get_answers_by_question(question_id):
    """get all answers by question id"""
    return Answer.query.filter(Answer.question_id==question_id).all()


def create_answer(user,gift_name,question_id):
    """create new answer"""
    question = Question.query.get(question_id)
    hobby = Hobby.query.filter(Hobby.hobby_name==question.hobby).first()
    hobby_id = hobby.hobby_id
    gift=Gift.query.filter(Gift.gift_name==gift_name).first()
    if gift == None:
        new_gift=Gift(gift_name=gift_name,gender=question.gender,age=question.age,
                      price=int(question.price),hobby_id=hobby_id)
        db.session.add(new_gift)
        db.session.commit()
        gift_id=new_gift.gift_id
    else:
        gift_id=gift.gift_id

    return Answer(question_id=question_id,user=user,gift_id=gift_id)

def create_like(user,answer_id):
    if len(Liked.query.filter(Liked.user_id==user.user_id,Liked.answer_id==answer_id).all()) == 0:
        return Liked(user=user,answer_id=answer_id)
    else:
        return False
           



if __name__ == "__main__":
    from server import app

    connect_to_db(app)
