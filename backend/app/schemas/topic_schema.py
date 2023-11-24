from pydantic import BaseModel

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