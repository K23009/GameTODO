from flask import Blueprint, render_template, request, redirect, url_for
from models import Schedule,Task

schedule_bp = Blueprint('schedule', __name__, url_prefix='/schedule')

@schedule_bp.route('/', methods=["GET", "POST"])
def list():
    if request.form.get('reset') == "True":
        Schedule.initialization()

    if Schedule.select().count() == 0:
        Schedule.initialization()

    schedules = Schedule.select()
    return render_template('schedule_list.html', items=schedules)

@schedule_bp.route('/edit/<int:schedule_id>', methods=['GET', 'POST'])
def edit(schedule_id):
    schedule = Schedule.get_or_none(Schedule.id == schedule_id)
    if request.method == 'POST':
        reset = request.form.get("reset")
        if(reset=="false"):
            schedule.kamoku = request.form['kamoku']
            schedule.kyousitu = request.form['kyousitu']
            schedule.week = request.form['week']
            schedule.class_num = request.form['class_num']
            schedule.is_recorded = True
        else:
            schedule.kamoku = "未登録"
            schedule.kyousitu = ""
            schedule.week = request.form['week']
            schedule.class_num = request.form['class_num']
            schedule.is_recorded = False
        schedule.save()
        return redirect(url_for('schedule.list'))
    return render_template('schedule_edit.html',schedule=schedule)

@schedule_bp.route('/add_task/<int:schedule_id>', methods=['GET', 'POST'])
def add_task(schedule_id):
    schedule = Schedule.get_or_none(Schedule.id == schedule_id)
    if request.method == 'POST':
        name = request.form['name']
        difficulty = request.form['difficulty']
        limit = request.form['limit']
        Task.create(name=name, difficulty=difficulty,limit=limit)
        return redirect(url_for('task.list'))
    return render_template('schedule_task.html' ,schedule = schedule)