from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponseModel(BaseModel):
    id: str
    name: str
    email: str
