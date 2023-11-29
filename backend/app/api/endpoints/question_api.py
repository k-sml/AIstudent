from fastapi import APIRouter
from crud.question_crud import *

from schemas.question_schema import *
from typing import List

router = APIRouter()

@router.post("/questions/", )