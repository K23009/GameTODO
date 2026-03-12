from flask import Flask, render_template
from models import initialize_database
from models import User, Task
from routes import blueprints
from datetime import date

app = Flask(__name__)

user = User()

# データベースの初期化
initialize_database()

for bp in blueprints:
    app.register_blueprint(bp)

@app.route('/')
def home():
    task = Task.select()
    user.load_from_file()
    today = date.today()
    
    nearest_task = task.where(Task.limit >= today).order_by(Task.limit).first()
    expired_task_count = task.where(Task.limit < today).count()
    
    return render_template('home.html', user=user.get_name(), point=user.get_point() , nearest_task=nearest_task, expired_count=expired_task_count)


if __name__ == '__main__':
    app.run(port=8080, debug=True)