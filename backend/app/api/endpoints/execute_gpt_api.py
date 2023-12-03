from fastapi import APIRouter
from crud.topic_crud import *
from crud.answer_crud import *
import os
import openai
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()

@router.post("/execute/{topic_id}", tags=["Execute"])
def first_execute_gpt_api(topic_id: str):
    topic = select_topic(topic_id)
    openai.api_key = os.getenv('OPENAI_API_KEY')
    res = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": topic.first_header},
            {"role": "user", "content": topic.first_prompt},
        ]
    )
    return res

@router.post("/execute/{answer_id}", tags=["Execute"])
def execute_openai_api(answer_id: str, res: list):
    answer = get_answer(answer_id)
    messages = res.append(
        {"role": "user", "content": answer.content}
    )
    openai.api_key = os.getenv('OPENAI_API_KEY')
    
    res = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    return res
    