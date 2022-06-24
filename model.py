"""Models for gift idea app."""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property

db = SQLAlchemy()

"""Model definitions"""

class User(db.Model):
    """User of gift Idea app."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String,nullable=False)
    username = db.Column(db.String)
    gender = db.Column(db.String)
    age = db.Column(db.String)

    hobbies = db.relationship("Hobby", secondary="users_hobbies", backref="users")
    # questions = a list of Question objects
    # answers = a list of Answer objects
    # likes = a list of Liked objects

    def __repr__(self):
        """User representation when printed."""
        return f"<User user_id={self.user_id} email={self.email}>"


class Gift(db.Model):
    """Gift idea database."""

    __tablename__ = "gifts"

    gift_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    gift_name = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    age = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    hobby_id = db.Column(db.Integer, db.ForeignKey("hobbies.hobby_id"))
    
    hobby = db.relationship("Hobby", backref="gifts")
    # answers = a list of Answer objects

    def __repr__(self):
        return f"<Gift gift_id={self.gift_id} name={self.gift_name}>"

class Hobby(db.Model):
    """Hobby in gift idea database."""

    __tablename__ = "hobbies"

    hobby_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    hobby_name = db.Column(db.String, nullable=False)

    # gifts = a list of Gift objects
    # users = users objects
    def __repr__(self):
        return f"<Hobby hobby_id={self.hobby_id} hobby_name={self.hobby_name}>"

class UserHobby(db.Model):
    """An association table with gift and hobby"""

    __tablename__ = "users_hobbies"

    user_hobby_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    hobby_id = db.Column(db.Integer, db.ForeignKey("hobbies.hobby_id"), nullable=False)


class Question(db.Model):
    """User questions."""

    __tablename__ = "questions"

    question_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    gender = db.Column(db.String, nullable=False)
    age = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    hobby = db.Column(db.String)
    question_type = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", backref="questions")
    answers = db.relationship("Answer", back_populates="question")

    def to_dict(self):
        question_dict = {}
        for answer in self.answers:
            question_dict["gender"] = self.gender
            question_dict["age"] = self.age
            question_dict["price"] = self.price
            question_dict["hobby"] = self.hobby
            question_dict["answers"] = {}
            question_dict["answers"]["gift_name"] = answer.gift.gift_name
            question_dict["answers"]["num_likes"] = answer.num_likes
        return question_dict
            
class Answer(db.Model):
    """User answers."""

    __tablename__ = "answers"

    answer_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.question_id"),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"),nullable=False)
    gift_id = db.Column(db.Integer, db.ForeignKey("gifts.gift_id"),nullable=False)
    
    question = db.relationship("Question", back_populates="answers")
    gift = db.relationship("Gift", backref="answers")
    user = db.relationship("User", backref="answers")
    likes = db.relationship("Liked", back_populates="answer")

    @hybrid_property
    def num_likes(self):
        return len(self.likes)

class Liked(db.Model):
    """User liked answers."""

    __tablename__ = "likes"

    liked_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    answer_id = db.Column(db.Integer, db.ForeignKey("answers.answer_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    
    answer = db.relationship("Answer", back_populates="likes")
    user = db.relationship("User", backref="likes")

def example_data():
    """Create example data for the test database."""

    fakeuser1 = User(email="mu@mu.com", password="mu")
    fakeuser2 = User(email="li@li.com", password="li")
    fakegift = Gift(gift_name='purse', gender='female', age="6-18", price=50, hobby_id=1)
    fakehobby = Hobby(hobby_name="fashion")
    fakeuserhobby1 = UserHobby(user_id=1, hobby_id=1)
    fakeuserhobby2 = UserHobby(user_id=2, hobby_id=1)
    fakequestion = Question(user_id=1, gender='male', age='toddler', price=20,question_type=True)
    fakeanswer = Answer(user_id=2, question_id=1)
    fakelike = Liked(answer_id=1, user_id=1)
    

    db.session.add_all([fakeuser1, fakeuser2, fakehobby, fakequestion, fakeanswer, fakelike])
    db.session.commit()
    db.session.add_all([fakegift,fakeuserhobby1, fakeuserhobby2])
    db.session.commit()


def connect_to_db(flask_app, db_uri="postgresql:///giftidea", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


# if __name__ == "__main__":
#     from server import app

#     # Call connect_to_db(app, echo=False) if your program output gets
#     # too annoying; this will tell SQLAlchemy not to print out every
#     # query it executes.

#     connect_to_db(app)

if __name__ == "__main__":
    from flask import Flask

    app = Flask(__name__)
    connect_to_db(app)
    db.create_all()