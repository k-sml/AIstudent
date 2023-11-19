import datetime
import uuid
import sys
from sqlalchemy import (Column, String, Text, ForeignKey, CHAR, VARCHAR, INT, \
                        create_engine, MetaData, DECIMAL, DateTime, exc, event, Index, \
                        and_)
from sqlalchemy.ext.declarative import declarative_base
from databases import Base
# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True


class User(base):
    __tablename__ = 'user'
    id = Column(CHAR(36), primary_key=True) # CHARは固定長
    name = Column(VARCHAR(255)) # VARCHARは可変長(VARIABLEの略)
    email = Column(VARCHAR(255))
    password = Column(VARCHAR(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        now = datetime.datetime.now()
        self.created_at = now
        self.updated_at = now