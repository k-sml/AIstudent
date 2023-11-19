from sqlalchemy import create_engine
import sys
from sqlalchemy.orm import (sessionmaker, relationship, scoped_session)
from sqlalchemy.ext.declarative import declarative_base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

#setting db connection
url = "mysql://root:test@db:3306/test?schema=public"
#dbエンジンの作成
engine = create_engine(url, echo=False, pool_recycle=10)

#create session
SessionClass = sessionmaker(engine)
session = SessionClass()

Base = declarative_base()
