from fastapi import APIRouter
from crud.answer_crud import create_answer, select_answer
from .execute_gpt_api import execute_openai_api

from schemas.answer_schema import AnswerCreate,AnswerResponseModel
from typing import List

router = APIRouter()

@router.post("/answer/",tags=['Answers'])
def create_new_answer(answer: AnswerCreate):
    answer_id = create_answer(answer.question_id, answer.user_id, answer.content)
    print(answer_id)
    res = execute_openai_api(answer_id, answer.messages)
    print(res)
    return res

@router.get("/answer/{question_id}",response_model=List[AnswerResponseModel],tags=['Answers'])
def get_answer(question_id: str):
    answer = select_answer(question_id)
    return AnswerResponseModel(id=answer.id, question_id=answer.question_id, user_id=answer.user_id, content=answer.content, created_at=answer.created_at) 