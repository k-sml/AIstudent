import datetime
import uuid
import sys
from sqlalchemy import Column, Text, ForeignKey, CHAR, DateTime
from sqlalchemy.orm import relationship
from databases import Base

sys.dont_write_bytecode = True

class Question(Base):
    __tablename__ = 'questions'
    id = Column(CHAR(36), primary_key=True)
    topic_id = Column(CHAR(36), ForeignKey('topics.id'))
    content = Column(Text)
    created_at = Column(DateTime)
    
    topic = relationship("Topic", back_populates="questions")
    answer = relationship("Answer", back_populates="questions")
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()