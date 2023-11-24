import datetime
import uuid
import sys
from sqlalchemy import Column, Text, ForeignKey, CHAR, DateTime, Index
from sqlalchemy.orm import relationship
from databases import Base

sys.dont_write_bytecode = True

class Question(Base):
    __tablename__ = 'questions'
    id = Column(CHAR(36), primary_key=True)
    topic_id = Column(CHAR(36), ForeignKey('topics.id'))
    content = Column(Text)
    created_at = Column(DateTime)
    
    answer = relationship("Answer", backref="questions")
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()

Index('question_content', Question.content, mysql_length=400)