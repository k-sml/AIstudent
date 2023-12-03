from pydantic import BaseModel
import datetime

class QuestionResponseModel(BaseModel):
    id: str
    content: str
    created_at: datetime.datetime