from peewee import Model, CharField, IntegerField, UUIDField, DateTimeField
from .db import db

# 他のユーザーと交換したカード用のデータベース
class Card(Model):
    uuid = UUIDField()# uuid用。
    updated_on = DateTimeField()# 更新日。受け取ったカードが新しいかどうかの判別。
    name = CharField()# 名前
    title1 = IntegerField()# 称号（左側）
    title2 = IntegerField()# 称号（右側）
    join_title = IntegerField()# 称号（真ん中）
    
    bg_pattern = IntegerField()# 背景のid
    name_color = CharField()
    bg1_color = CharField()
    bg2_color = CharField()
    other_color = CharField()# カードの色
    
    task_complate_count = IntegerField()# タスク完了数
    title_get_count = IntegerField()# 称号獲得数
    total_get_point_count = IntegerField()# 総獲得ポイント
    achievement_complate_count = IntegerField()# 実績完了数
    

    class Meta:
        database = db

    #def initialization():
    #    Achievement.create(task_complate_count = 0, title_get_count = 0, total_get_point_count = 0)
    #    q = Achievement.delete()
    #    q.execute()
    #    #db.commit()
    #    Achievement.create(task_complate_count = 0, title_get_count = 0, total_get_point_count = 0)