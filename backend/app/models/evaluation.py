import datetime
import uuid
import sys
from sqlalchemy import Column, Text, ForeignKey, CHAR, DateTime, Integer, Index
from sqlalchemy.orm import relationship
from databases import Base

sys.dont_write_bytecode = True

class Evaluation(Base):
    __tablename__ = "evaluations_table"
    id = Column(CHAR(36), primary_key=True)
    user_id = Column(CHAR(36), ForeignKey("users_table.id"))
    topic_id = Column(CHAR(36), ForeignKey("topics_table.id"))
    score = Column(Integer)
    content = Column(Text)
    created_at = Column(DateTime)

    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()

Index('question_content', Evaluation.content, mysql_length=400)