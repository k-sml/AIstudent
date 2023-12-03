from pydantic import BaseModel

class AnswerCreate(BaseModel):
    question_id: str
    user_id: str
    content: str

class AnswerResponseModel(BaseModel):
    id: str
    question_id: str
    user_id: str
    content: str
    created_at: str