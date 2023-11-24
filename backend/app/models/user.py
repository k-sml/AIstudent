import datetime
import uuid
import sys
from sqlalchemy import Column, CHAR, VARCHAR, DateTime
from sqlalchemy.orm import relationship
# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True
from databases import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(CHAR(36), primary_key=True) # CHARは固定長
    name = Column(VARCHAR(255)) # VARCHARは可変長(VARIABLEの略)
    email = Column(VARCHAR(255))
    password = Column(VARCHAR(255))
    status = Column(VARCHAR(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    topic = relationship('Topic', backref='users')
    evaluation = relationship('Evaluation', backref='users')
    answer = relationship('Answer', backref='answers')
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        now = datetime.datetime.now()
        self.created_at = now
        self.updated_at = now