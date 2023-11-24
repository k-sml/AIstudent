import uuid
import sys
from sqlalchemy import Column, Text, CHAR, VARCHAR, Enum, Integer, ForeignKey
from databases import Base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

class Topic(Base):
    __tablename__ = 'topic'
    id = Column(CHAR(36), primary_key=True)
    title = Column(VARCHAR(255))
    explain = Column(Text)
    # Enum型を使用してtarget属性を追加
    target = Column(Enum('student', 'professional', 'people', 'god'))
    user_id = Column(CHAR, ForeignKey('user.id'))
    
    def __init__(self):
        self.id = str(uuid.uuid4())
