from pydantic import BaseModel

class Response(BaseModel):
    role: str
    content: str