from pydantic import BaseModel

class AnswerCreate(BaseModel):
    question_id: str
    user_id: str
    content: str
    topic_id: str

class AnswerResponseModel(BaseModel):
    id: str
    question_id: str
    user_id: str
    content: str
    topic_id: str
    created_at: str