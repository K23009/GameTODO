from peewee import Model, CharField,IntegerField, DateField
from .db import db

class Task(Model):
    name = CharField()
    difficulty = IntegerField()
    limit = DateField()

    class Meta:
        database = db

class CompletedTask(Model):
    name = CharField()
    difficulty = IntegerField()
    limit = DateField()

    class Meta:
        database = db