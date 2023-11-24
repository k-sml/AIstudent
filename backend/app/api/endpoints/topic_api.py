from fastapi import APIRouter
from crud.topic_crud import create_topic, select_user_topic, select_topic

from schemas.topic_schema import TopicCreate,TopicResponseModel
from typing import List

router = APIRouter()

@router.post("/topic/",response_model=TopicCreate,tags=['Topics'])
def create_new_topic(topic: TopicCreate):
    create_topic(topic.title, topic.explain, topic.target, topic.user_id)
    return topic

@router.get("/topic/{user_id}",response_model=List[TopicResponseModel],tags=['Topics'])
def get_user_topic(user_id: str):
    topics = select_user_topic(user_id)
    return [TopicResponseModel(id=topic.id, title=topic.title, explain=topic.explain, target=topic.target, user_id=topic.user_id) for topic in topics ]

@router.get("/topic/{topic_id}",response_model=TopicResponseModel,tags=['Topics'])
def get_topic(topic_id: str):
    topic = select_topic(topic_id)
    return TopicResponseModel(id=topic.id, title=topic.title, explain=topic.explain, target=topic.target, user_id=topic.user_id)