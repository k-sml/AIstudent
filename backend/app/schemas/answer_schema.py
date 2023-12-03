from pydantic import BaseModel

class AnswerCreate(BaseModel):
    user_id: str
    question_id: str
    content: str
    messages: list

class AnswerResponseModel(BaseModel):
    id: str
    question_id: str
    user_id: str
    content: str
    created_at: str