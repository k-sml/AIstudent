import datetime
import uuid
import sys
from sqlalchemy import Column, Text, ForeignKey, CHAR, DateTime, Index
from sqlalchemy.orm import relationship
from databases import Base

sys.dont_write_bytecode = True

class Answer(Base):
    __tablename__ = 'answers_table'
    id = Column(CHAR(36), primary_key=True)
    question_id = Column(CHAR(36), ForeignKey('questions_table.id'))
    user_id = Column(CHAR(36), ForeignKey('users_table.id'))
    content = Column(Text)
    created_at = Column(DateTime)

    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()

Index('answer_content', Answer.content, mysql_length=400)