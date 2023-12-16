from fastapi import APIRouter
from crud.evaluation_crud import select_evaluation, register_evaluation
from .execute_gpt_api import execute_evaluation
from schemas.evaluation_schema import EvaluationCreate

router = APIRouter()

@router.post("/evaluation/", tags=['Evaluations'])
def calculate_evaluation(evaluationData: EvaluationCreate):
    res = execute_evaluation(evaluationData.res)
    print(res, '------------')
    register_evaluation(user_id=evaluationData.user_id, topic_id=evaluationData.topic_id, content=res.choices[0].message.content, score=res.choices[0].message.content)
    return res
    