from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserResponseModel(BaseModel):
    id: int
    name: str
    email: str
