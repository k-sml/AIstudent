from pydantic import BaseModel

class EvaluationCreate(BaseModel):
    user_id: str
    topic_id: str
    res: list

class EvaluationResponseModel(BaseModel):
    res: list