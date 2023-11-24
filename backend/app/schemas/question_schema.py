from pydantic import BaseModel
import datetime

class QuestionCreate(BaseModel):
    prompt: str
    created_at: datetime.datetime