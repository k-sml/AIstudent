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
    # Enum型を使用してtarget属性を追加
    target = Column(Enum('student', 'professional', 'people', 'god'))
    user_id = Column(CHAR, ForeignKey('user.id'))
    
    user = relationship('User', back_populates='topics')
    question = relationship('Question', back_populates='topics')
    evaluation = relationship('Evaluation', back_populates='topics')
    
    def __init__(self):
        self.id = str(uuid.uuid4())

