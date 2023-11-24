from pydantic import BaseModel

class TopicCreate(BaseModel):
    name: str
    title: str
    explain: str
    target: str
    