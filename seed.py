""" Utility file to seed giftidea database in data/ """
import os
# import json
import csv

# import crud
from model import User, Gift, Hobby, UserHobby, Question, Answer, Liked
from model import connect_to_db, db
# import server

os.system("dropdb giftidea")
os.system("createdb giftidea")

from flask import Flask
app = Flask(__name__)
    
connect_to_db(app)
db.create_all()

def load_users():
    """ Load users from users.csv into database """

    print ("Users")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    User.query.delete()

    with open("data/users.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            user = User(email=row[1], password=row[2],
                        username=row[3], gender=row[4], age=row[5])
            db.session.add(user)
    db.session.commit()

def load_gifts():
    """ Load gifts from gifts.csv into database """

    print ("Gifts")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    Gift.query.delete()

    with open("data/gifts.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            gift = Gift(gift_name=row[1], gender=row[2],
                        age=row[3], price=row[4], hobby_id=row[5])
            db.session.add(gift)
    db.session.commit()

def load_hobbies():
    """ Load hobbies from hobbies.csv into database """

    print ("Hobbies")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    Hobby.query.delete()

    with open("data/hobbies.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            hobby = Hobby(hobby_name=row[1])
            db.session.add(hobby)
    db.session.commit()

def load_users_hobbies():
    """ Load users_hobbies from usershobby.csv into database """

    print ("UsersHobbies")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    UserHobby.query.delete()

    with open("data/userhobby.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            userhobby = UserHobby(user_id=row[1], hobby_id=row[2])
            db.session.add(userhobby)
    db.session.commit()

def load_questions():
    """ Load questions from questions.csv into database """

    print ("Questions")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    Question.query.delete()

    with open("data/questions.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            question = Question(user_id=row[1], gender=row[2],
                        age=row[3], price=row[4], hobby=row[5], question_type=bool(row[6]))
            db.session.add(question)
    db.session.commit()

def load_answers():
    """ Load users from users.csv into database """

    print ("Answers")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    Answer.query.delete()

    with open("data/answers.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            answer = Answer(question_id=row[1], user_id=row[2], gift_id=row[3])
            db.session.add(answer)
    db.session.commit()

def load_likes():
    """ Load user likes from likess.csv into database """

    print ("Likes")

    # Delete all rows in table, so if we need to run this a second time,
    # we won't be trying to add duplicate users
    Liked.query.delete()

    with open("data/likes.csv") as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            liked = Liked(answer_id=row[1], user_id=row[2])
            db.session.add(liked)
    db.session.commit()


load_users()
load_hobbies()
load_users_hobbies()
load_gifts()
load_questions()
load_answers()
load_likes()
