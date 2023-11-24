import sys
from models.topic import Topic 
from databases import create_new_session

# .pycファイルの生成を防ぐ
sys.dont_write_bytecode = True
# トピックを追加する関数
def create_topic(topic_name, topic_title, topic_explain, topic_target):
    session = create_new_session()
    topic = Topic()
    topic.name = topic_name
    topic.title = topic_title
    topic.explain = topic_explain
    session.add(topic)
    session.commit()
    return 0


