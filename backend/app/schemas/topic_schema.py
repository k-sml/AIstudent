from pydantic import BaseModel
import datetime

class TopicCreate(BaseModel):
    title: str
    explain: str
    target: str
    user_id: str
    
    

class TopicResponseModel(BaseModel):
    id: str
    title: str
    explain: str
    target: str
    user_id: str
    created_at: datetime.datetime

class Topic(BaseModel):
    id: str
    title: str
    explain: str
    target: str
    user_id: str
    first_prompt: str
    first_header: str
    