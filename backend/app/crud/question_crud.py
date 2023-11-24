import sys
from models.question import Question
from databases import create_new_session
from dotenv import load_dotenv
import os
import datetime
load_dotenv()

sys.dont_write_bytecode = True

def create_question(title, explain, target):
    session = create_new_session()
    header = f"あなたは{target}になりきって今から与えるタイトルに関する説明を受け、疑問に思うことや発展して聞きたいことを出力して下さい。\n最終的な目的は説明をしてくる相手のタイトルに関する理解を深めるために行っています。\n"
    prompt = header + f"{title}に関する説明を今から行います。\n{explain}"
    question = Question()
    question.content = prompt
    question.created_at = datetime.datetime.now()
    session.add()
    session.commit()
    return 0

def execute_question(prompt):
    openai.api_key = os.getenv('OPENAI_API_KEY')
    model = "gpt-3.5-turbo"
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        max_tokens=100,
    )
    return response