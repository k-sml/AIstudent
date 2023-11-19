from fastapi import APIRouter
from ...crud.user_crud import select_all_user, create_user, delete_user, select_user, update_user
from ...schemas.user_schema import UserCreate, User
from typing import List

router = APIRouter()

@router.get("/users/", response_model=List[User])
def read_users():
    users = select_all_user()
    return users

@router.get("/users/{user_id}", response_model=User)
def read_user(user_id: str):
    user = select_user(user_id)
    return user

@router.post("/users/", response_model=User)
def create_new_user(user: UserCreate):
    create_user(user.name, user.email, user.password)
    return user

@router.patch("/users/{user_id}")
def update_user_information(user_id: str):
    update_user(user_id)
    return {"status": "user updated"}

@router.delete("users/{user_id}")
def remove_user(user_id: str):
    delete_user(user_id)
    return {"status": "user deleted"}