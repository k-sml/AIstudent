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


class Feedback(base):
    __tablename__ = 'feedback'
    id = Column(CHAR(36), primary_key=True)
    user_id = Column(CHAR(36), ForeignKey('user.id'))
    topic_id = Column(CHAR(36), ForeignKey('user.id'))
    content = Column(Text)
    score = Column(INT)
    created_at = Column(DateTime)
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()