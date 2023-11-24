import sys
from models.answer import Answer
from databases import create_new_session
import datetime

sys.dont_write_bytecode = True

def create_answer(question_id, user_id, content):
    session = create_new_session()
    answer = Answer()
    answer.user_id = user_id
    answer.question_id = question_id
    answer.created_at = datetime.datetime.now()
    answer.content = content
    session.add(answer)
    session.commit()
    return 0

def select_answer(question_id):
    session = create_new_session()
    answer = session.query(Answer).filter(Answer.question_id == question_id).first()
    if answer == None:
        answer = ""
    return answer

def update_answer(question_id, content):
    session = create_new_session()
    answer = session.query(Answer).filter(Answer.question_id == question_id).first()
    if answer == None:
        return 1
    answer.content = content
    answer.created_at = datetime.datetime.now()
    session.commit()
    return 0
