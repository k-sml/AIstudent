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

def create_first_question(topic_id):
    session = create_new_session()
    target = session.query(Topic).filter(Topic.id == topic_id).target
    title = session.query(Topic).filter(Topic.id == topic_id).title
    explain = session.query(Topic).filter(Topic.id == topic_id).explain
    header = f"あなたは{topic_id.target}になりきって今から与えるタイトルに関する説明を受け、疑問に思うことや発展して聞きたいことを出力して下さい。\n最終的な目的は説明をしてくる相手のタイトルに関する理解を深めるために行っています。\n"
    prompt = header + f"{topic_id.title}に関する説明を今から行います。\n{topic_id.explain}"
    question = Question()
    question.content = prompt
    question.created_at = datetime.datetime.now()
    session.add(question)
    session.commit()
    return 0

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
    return 0

# def execute_question(prompt):
#     openai.api_key = os.getenv('OPENAI_API_KEY')
#     model = "gpt-3.5-turbo"
#     response = openai.Completion.create(
#         engine=model,
#         prompt=prompt,
#         max_tokens=100,
#     )
#     return response

def select_questions(topic_id):
    session = create_new_session()
    question_list = session.query(Question).filter(Question.topic_id == topic_id)
    if question_list == None:
        question_list = []
    return question_list
