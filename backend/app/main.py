from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from databases import engine

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True
#models.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = ['http://localhost:12012']

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