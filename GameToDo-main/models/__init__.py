from peewee import SqliteDatabase
from .db import db
from .task import Task, CompletedTask
from .schedule import Schedule
from .card import Card
from .user import User

# モデルのリストを定義しておくと、後でまとめて登録しやすくなります
MODELS = [
    Task,
    Schedule,
    CompletedTask,
    Card,
]

# データベースの初期化関数
def initialize_database():
    db.connect()
    db.create_tables(MODELS, safe=True)
    db.close()