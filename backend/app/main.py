from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True

app = FastAPI()

origins = ['*']

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