import uuid
import sys

from sqlalchemy import Column, Text, CHAR, VARCHAR, Index, ForeignKey, Enum
from sqlalchemy.orm import relationship

from databases import Base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

class Topic(Base):
    __tablename__ = 'topics_table'
    id = Column(CHAR(36), primary_key=True)
    user_id = Column(CHAR(36), ForeignKey('users_table.id'))
    title = Column(VARCHAR(255))
    explain = Column(Text)
 
    # Enum型を使用してtarget属性を追加
    target = Column(Enum('student', 'professional', 'people', 'god'))
    first_prompt = Column(Text)
    first_header = Column(Text)
    
    question = relationship('Question', backref='topics_table')
    evaluation = relationship('Evaluation', backref='topics_table')
    
    def __init__(self):
        self.id = str(uuid.uuid4())


Index('topic_explain', Topic.explain, mysql_length=400)
Index('topic_first_prompt', Topic.first_prompt, mysql_length=400)
Index('topic_first_header', Topic.first_header, mysql_length=400)

