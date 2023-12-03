from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from databases import engine, Base
from models.user import User
from models.topic import Topic
from models.question import Question
from models.answer import Answer
from models.evaluation import Evaluation
from api.endpoints import user_api
from api.endpoints import topic_api
from api.endpoints import question_api
# from api.endpoints import evaluation_api
# from api.endpoints import answer_api

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_api.router, prefix="/api")
app.include_router(topic_api.router, prefix="/api")
app.include_router(question_api.router, prefix="/api")
# app.include_router(answer_api.router, prefix="/api")


origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_api.router, prefix="/api")


@app.get('/')
def Hello():
    return { 'message': 'Hello World' }

