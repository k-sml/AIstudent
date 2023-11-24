from fastapi import APIRouter
from crud.topic_crud import create_topic, select_user_topic, select_topic

from schemas.topic_schema import TopicCreate,TopicResponseModel
from typing import List

router = APIRouter()

@router.post("/topic/",response_model=TopicCreate,tags=['Topics'])
def create_new_topic(topic: TopicCreate):
    header = f"あなたは{topic.target}になりきって今から与えるタイトルに関する説明を受け、疑問に思うことや発展して聞きたいことを出力して下さい。\n最終的な目的は説明をしてくる相手のタイトルに関する理解を深めるために行っています。\n"
    prompt = f"{topic.title}に関する説明を今から行います。\n{topic.explain}"
    create_topic(topic.title, topic.explain, topic.target, topic.user_id, prompt, header )
    return topic

@router.get("/myTopics/{user_id}",response_model=List[TopicResponseModel],tags=['Topics'])
def get_user_topic(user_id: str):
    topics = select_user_topic(user_id)
    return [TopicResponseModel(id=topic.id, title=topic.title, explain=topic.explain, target=topic.target, user_id=topic.user_id) for topic in topics ]

@router.get("/topic/{topic_id}",response_model=TopicResponseModel,tags=['Topics'])
def get_topic(topic_id: str):
    topic = select_topic(topic_id)
    return TopicResponseModel(id=topic.id, title=topic.title, explain=topic.explain, target=topic.target, user_id=topic.user_id)