from fastapi import APIRouter
from crud.user_crud import select_all_user, create_user, delete_user, select_user, update_user, user_check
from schemas.user_schema import UserCreate, UserResponseModel, UserLogin
from typing import List

router = APIRouter()

@router.get("/users/", response_model=List[UserResponseModel],tags=['Users'])
def read_users():
    users = select_all_user()
    return [UserResponseModel(id=user.id, name=user.name, email=user.email) for user in users]

@router.get("/users/{user_id}", response_model=UserResponseModel,tags=['Users'])
def read_user(user_id: str):
    user = select_user(user_id)
    return UserResponseModel(id=user.id, name=user.name, email=user.email)

@router.post("/users/", response_model=UserResponseModel,tags=['Users'])
def create_new_user(user: UserCreate):
    userId = create_user(user.name, user.email, user.password)
    return UserResponseModel(id=userId, name=user.name, email=user.email)

@router.post("/users/login",tags=['Users'])
def login_user(user: UserLogin):
    user = user_check(user.email, user.password)
    if(user == 0):
        return 0
    else:
      return user

@router.patch("/users/{user_id}",tags=['Users'])
def update_user_information(user_id: str, user: UserCreate):
    update_user(user_id, user.name, user.email, user.password)
    return {"status": "user updated"}

@router.delete("/users/{user_id}",tags=['Users'])
def remove_user(user_id: str):
    delete_user(user_id)
    return {"status": "user deleted"}