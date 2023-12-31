# -*- encoding: utf-8 -*-
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
import sys
from models.user import User
from databases import create_new_session


# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

def select_all_user():
    session = create_new_session()
    user_list = session.query(User).filter(User.status == 'created').all()
    if user_list == None:
        user_list = []
    return user_list

def create_user(user_name, user_email, user_password):
    session = create_new_session()
    user = User()
    user.name = user_name
    user.email = user_email
    user.password = user_password
    user.status = "created"
    try:
      session.add(user)
      session.commit()
      return user.id
    except IntegrityError:
        # メールアドレスが重複した場合のエラー処理
      session.rollback()  # トランザクションをロールバック
      raise HTTPException(status_code=400, detail="このメールアドレスは既に使用されています。")

def user_check(user_email,user_password):
    session = create_new_session()
    user = session.query(User).filter(User.email == user_email).first()
    if user == None:
        return 0
    if user.password != user_password:
        return 0
    return user


def select_user(user_id):
    session = create_new_session()
    user = session.query(User).filter(User.id == user_id).first()           
    if user == None:
        user = ""
    return user

def update_user(user_id, user_name, user_mail, user_password):
    session = create_new_session()
    user = session.query(User).filter(User.id == user_id).first()
    if user == None:
        return 1
    user.name = user_name
    user.email = user_mail
    user.password = user_password
    session.commit()
    return 0

def delete_user(user_id):
    session = create_new_session()
    user = session.query(User).filter(User.id == user_id).first()
    if user == None:
        return 1
    user.status = "deleted"
    session.commit()
    return 0


