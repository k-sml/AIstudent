import datetime
import uuid
import sys
from sqlalchemy import Column, Text, ForeignKey, CHAR, DateTime, Integer
from sqlalchemy.orm import relationship
from databases import Base

sys.dont_write_bytecode = True

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(CHAR(36), primary_key=True)
    user_id = Column(CHAR(36), ForeignKey("users.id"))
    topic_id = Column(CHAR(36), ForeignKey("topics.id"))
    score = Column(Integer)
    created_at = Column(DateTime)

    user = relationship("User", back_populates="evaluations")
    topic = relationship("Topic", back_populates="evaluations")
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()