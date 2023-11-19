from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from databases import engine, Base
from models.user import User
from models.topic import Topic
from models.feedback import Feedback
from models.interaction import Interaction
from api.endpoints import user_api

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user_api.router, prefix="/api")

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def Hello():
    return { 'message': 'Hello World' }

