from model import User, Gift, Hobby, UserHobby, Question, Answer, Liked
from model import connect_to_db, db

def get_gifts(gender, age, price, hobbies):
    # gift_list = []
    hobby_id_list = []
    for hobby in hobbies:
        hobby_id = Hobby.query.filter(Hobby.hobby_name == hobby).one().hobby_id
        hobby_id_list.append(hobby_id)
        # gift_sublist = Gift.query.filter(Gift.gender == gender, Gift.age == age, 
        #                                 Gift.price == price, Gift.hobby_id == hobby_id).all()
        # gift_list.extend(gift_sublist)
    
    # return gift_list
    return Gift.query.filter(Gift.gender == gender, Gift.age == age, 
                            Gift.price == price, Gift.hobby_id.in_(hobby_id_list)).all()



    
if __name__ == "__main__":
    from server import app

    connect_to_db(app)
