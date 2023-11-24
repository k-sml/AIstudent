from fastapi import APIRouter
from crud.topic_crud import create_topic

from schemas.topic import TopicCreate
from typing import List

router = APIRouter()

@router.post("/topic/",response_model=TopicCreate)
def create_new_topic(topic: TopicCreate):
    create_topic(topic.name, topic.title, topic.explain, topic.target)
    return topic

