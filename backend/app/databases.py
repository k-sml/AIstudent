from sqlalchemy import create_engine
import sys
from sqlalchemy.orm import (sessionmaker, relationship, scoped_session)
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os
load_dotenv()

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

#setting db connection
url = os.getenv('DATABASE_URL')
#dbエンジンの作成(開発時はechoをTrueにしてログ確認)
engine = create_engine(url, echo=True, pool_recycle=1800)

#create session
SessionClass = sessionmaker(engine)
session = SessionClass()


Base = declarative_base()

