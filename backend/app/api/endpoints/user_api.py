from fastapi import APIRouter
from crud.user_crud import select_all_user, create_user, delete_user, select_user, update_user

from schemas.user_schema import UserCreate, UserResponseModel
from typing import List

router = APIRouter()

@router.get("/users/", response_model=List[UserResponseModel])
def read_users():
    users = select_all_user()
    return [UserResponseModel(id=user.id, name=user.name, email=user.email) for user in users]

@router.get("/users/{user_id}", response_model=UserResponseModel)
def read_user(user_id: str):
    user = select_user(user_id)
    return UserResponseModel(id=user.id, name=user.name, email=user.email)

@router.post("/users/", response_model=UserCreate)
def create_new_user(user: UserCreate):
    create_user(user.name, user.email, user.password)
    return user

@router.patch("/users/{user_id}")
def update_user_information(user_id: str, user: UserCreate):
    update_user(user_id, user.name, user.email, user.password)
    return {"status": "user updated"}

@router.delete("/users/{user_id}")
def remove_user(user_id: str):
    delete_user(user_id)
    return {"status": "user deleted"}