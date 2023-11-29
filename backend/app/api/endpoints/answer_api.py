from fastapi import APIRouter
from crud.answer_crud import create_answer, select_answer, update_answer

from schemas.answer_schema import AnswerCreate, AnswerResponseModel
from typing import List

router = APIRouter()

@router.post("/answer/",response_model=AnswerCreate,tags=['Answers'])
def create_new_answer(answer: AnswerCreate):
    create_answer(answer.question_id, answer.user_id, answer.content)
    return answer

@router.get("/answer/{question_id}",response_model=AnswerResponseModel,tags=['Answers'])
def get_answer(question_id: str):
    answer = select_answer(question_id)
    return AnswerResponseModel(id=answer.id, question_id=answer.question_id, user_id=answer.user_id, content=answer.content, created_at=answer.created_at)

