import datetime
import uuid
import sys
from sqlalchemy import Column, Text, ForeignKey, CHAR, DateTime
from databases import Base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

class Interaction(Base):
    __tablename__ = 'interaction'
    interaction_id = Column(CHAR(36), primary_key=True)
    user_id = Column(CHAR(36), ForeignKey('user.id'))
    topic_id = Column(CHAR(36), ForeignKey('topic.id'))
    question = Column(Text)
    answer = Column(Text)
    created_at = Column(DateTime)
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.datetime.now()