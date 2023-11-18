import datetime
import uuid
import sys
from sqlalchemy import (Column, String, Text, ForeignKey, CHAR, VARCHAR, INT, \
                        create_engine, MetaData, DECIMAL, DateTime, exc, event, Index, \
                        and_)
from sqlalchemy.ext.declarative import declarative_base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

# SQLAlchemyでデータベースのクラスを定義するためのベースクラス
base = declarative_base()

class Topic(base):
    __tablename__ = 'topic'
    id = Column(CHAR(36), primary_key=True)
    title = Column(VARCHAR(255))
    explain = Column(Text)