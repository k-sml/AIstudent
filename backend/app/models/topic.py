import uuid
import sys
from sqlalchemy import Column, Text, CHAR, VARCHAR, Index, ForeignKey
from sqlalchemy.orm import relationship
from databases import Base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

class Topic(Base):
    __tablename__ = 'topics'
    id = Column(CHAR(36), primary_key=True)
    user_id = Column(CHAR(36), ForeignKey('users.id'))
    title = Column(VARCHAR(255))
    explain = Column(Text)
    
    question = relationship('Question', backref='topics')
    evaluation = relationship('Evaluation', backref='topics')
    
    def __init__(self):
        self.id = str(uuid.uuid4())
        
Index('topic_content', Topic.explain, mysql_length=400)