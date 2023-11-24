import sys
from models.topic import Topic 
from databases import create_new_session

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True
# トピックを追加する関数
def create_topic(topic_title, topic_explain, topic_target,user_id):
    session = create_new_session()
    topic = Topic()
    topic.title = topic_title
    topic.explain = topic_explain
    topic.target = topic_target
    topic.user_id = user_id
    session.add(topic)
    session.commit()
    return 0

# user_idを指定してトピックを複数取得する関数
def select_user_topic(user_id):
    session = create_new_session()
    topics = session.query(Topic).filter(Topic.user_id == user_id).all()           
    if topics == None:
        topics = ""
    return topics

# topic_idを指定してトピックを1つ取得する関数
def select_topic(topic_id):
    session = create_new_session()
    topic = session.query(Topic).filter(Topic.id == topic_id).first()     
    if topic == None:
        topic = ""
    return topic

