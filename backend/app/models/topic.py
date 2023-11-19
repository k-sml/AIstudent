import uuid
import sys
from sqlalchemy import Column, Text, CHAR, VARCHAR
from databases import Base

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

class Topic(Base):
    __tablename__ = 'topic'
    id = Column(CHAR(36), primary_key=True)
    title = Column(VARCHAR(255))
    explain = Column(Text)
    
    def __init__(self):
        self.id = str(uuid.uuid4())