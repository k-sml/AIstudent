from fastapi import APIRouter
from crud.question_crud import *

from schemas.question_schema import *
from typing import List

router = APIRouter()

@router.post("/questions/{topic_id}", tags=['Questions'])
def create_new_question(topic_id: str):
    try:
        create_first_question(topic_id)
        return {"status": "first question created"}
    except:
        return {"status": "first question created error"}

@router.post("/questions/{answer_id}", tags=['Questions'])
def create_reply_question(answer_id: str):
    try:
        create_question(answer_id)
        return {"status": "question created"}
    except:
        return {"status": "question created error"}
    
    
@router.get("/questions/{topic_id}", response_model=List[QuestionResponseModel], tags=['Questions'])
def get_questions_by_topicID(topic_id: str):
    questions = select_questions(topic_id)
    return [QuestionResponseModel(id=question.id, prompt=question.content, created_at=question.created_at) for question in questions]