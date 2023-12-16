import sys
import datetime
from models.evaluation import Evaluation
from databases import create_new_session

sys.dont_write_bytecode = True

def register_evaluation(user_id, topic_id, score, content):
    session = create_new_session()
    eval = Evaluation()
    eval.user_id = user_id
    eval.topic_id = topic_id
    eval.score = int(score)
    eval.created_at = datetime.datetime.now()
    eval.content = content
    session.add(eval)
    session.commit()
    return eval.id

def select_evaluation(eval_id):
    session = create_new_session()
    eval = session.query(Evaluation).filter(Evaluation.id == eval_id).first()
    if eval == None:
        eval = ""
    return eval