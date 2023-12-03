import sys
from models.question import Question
from models.topic import Topic
from models.answer import Answer
from databases import create_new_session
from dotenv import load_dotenv
import os
import datetime
load_dotenv()

sys.dont_write_bytecode = True

def create_first_question(topic_id, content):
    session = create_new_session()
    question = Question()
    question.content = content
    question.created_at = datetime.datetime.now()
    question.topic_id = topic_id
    question_id = question.id
    session.add(question)
    session.commit()
    return question_id

def create_question(answer_id):
    session = create_new_session()
    header = f"前回のあなたの問いに対して相手はこのように返してきました。\n"
    content = session.query(Answer).filter(Answer.id == answer_id).content
    prompt = header + content
    question = Question()
    question.content = prompt
    question.created_at = datetime.datetime.now()
    session.add(question)
    session.commit()
    return question

def select_questions(topic_id):
    session = create_new_session()
    question_list = session.query(Question).filter(Question.topic_id == topic_id)
    if question_list == None:
        question_list = []
    return question_list

def select_questions_by_questionID(question_id):
    session = create_new_session()
    question = session.query(Question).filter(Question.id == question_id)
    return question
