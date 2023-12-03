from fastapi import APIRouter
from crud.topic_crud import *
from crud.answer_crud import *
import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()

@router.post("/execute/{topic_id}", tags=["Execute"])
def first_execute_gpt_api(topic_id: str):
    topic = select_topic(topic_id)
    client = OpenAI(api_key=os.getenv('OPEN_API_KEY'))
    res = client.chat.completions.create(
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
    client = OpenAI(api_key=os.getenv('OPEN_API_KEY'))
    messages = res.append(
        {"role": "user", "content": answer.content}
    )
    
    res = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    return res
    