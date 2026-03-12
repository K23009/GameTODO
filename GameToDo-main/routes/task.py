from flask import Blueprint, render_template, request, redirect, url_for
from models import Task, CompletedTask, User
from services.point_manager import PointManager
from services.achievement_manager import AchievementManager

task_bp = Blueprint('task', __name__, url_prefix='/tasks')

@task_bp.route('/')
def list():

    # データ取得
    
    task = Task.select()

    return render_template('task_list.html', title='タスク一覧',items = task)

# 完了タスク一覧
@task_bp.route('/completed')
def completed():
    completed_tasks = CompletedTask.select()  # 完了したタスクを取得
    return render_template('task_completed.html', title='完了したタスク', items=completed_tasks)

@task_bp.route('/delete/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    task = CompletedTask.get_or_none(CompletedTask.id == task_id)
    if task:
        task.delete_instance()  # 完了タスクを削除
    return redirect(url_for('task.completed'))

@task_bp.route('/add', methods = ['GET', 'POST'])
def add():
    if request.method == 'POST':
        name = request.form['name']
        difficulty = request.form['difficulty']
        limit = request.form['limit']
        Task.create(name=name, difficulty=difficulty,limit=limit)
        return redirect(url_for('task.list'))
    return render_template('task_add.html')


@task_bp.route('/edit/<int:task_id>', methods = ['GET', 'POST'])
def edit(task_id):
    task = Task.get_or_none(Task.id == task_id)
    if not task:
        return redirect(url_for('task.list'))

    if request.method == 'POST':
        task.name = request.form['name']
        task.difficulty = request.form['difficulty']   
        task.limit = request.form['limit']
        task.save()
        return redirect(url_for('task.list'))
        

    return render_template('task_edit.html', task=task)

@task_bp.route('/complete/<int:task_id>', methods=['POST'])
def complete(task_id):
    task = Task.get_or_none(Task.id == task_id)
    if task:
        # 完了タスクに移動
        CompletedTask.create(name=task.name, difficulty=task.difficulty, limit=task.limit)
        pm = PointManager(User())
        pm.task_done(task.limit, task.difficulty) # ポイントを追加
        task.delete_instance()  # タスクを削除
        AchievementManager(User()).add_completed_task_count()
    return redirect(url_for('task.list'))