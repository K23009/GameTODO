from peewee import Model, CharField, IntegerField, BooleanField
from .db import db

class Schedule(Model):
    kamoku = CharField()
    kyousitu = CharField()
    week = IntegerField()#曜日を0~4で表す
    class_num = IntegerField()#時限を0~5で表す
    is_recorded = BooleanField()# 授業が記録済みかどうか

    class Meta:
        database = db

    def initialization():
        Schedule.create(kamoku="未登録",kyousitu = "",week=0,class_num = 0,is_recorded=False)
        q = Schedule.delete()
        q.execute()
        #db.commit()
        for i in range(5):
            for j in range(5):
                #print(f"i: {i},j: {j}")
                Schedule.create(kamoku="未登録",kyousitu = "",week = j,class_num = i,is_recorded=False)