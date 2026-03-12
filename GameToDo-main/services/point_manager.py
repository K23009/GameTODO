from models.user import User
from datetime import date
from services.achievement_manager import AchievementManager

class PointManager:   # ポイント管理クラス
    
    def __init__(self, user: User):
        self.user = user
        self.user.load_from_file()
        
    def get_point(self):            # ポイントを取得　使用法: get_point()
        self.load()
        return self.user.get_point()
    
    def add_point(self, point):     # ポイントを追加　使用法: add_point(ポイント)
        self.load()
        self.user.point += point
        self.save()
        AchievementManager(User()).add_total_point(point)
        
    def set_point(self, point):     # ポイントを設定　使用法: set_point(ポイント)
        self.user.set_point(point)
        self.save()
        
    def task_done(self, limit_date, difficulty):    # タスク完了時のポイント計算　使用法: task_done(期限日, 難易度)
        self.load()
        point = 0
        today = date.today()
        
        if type(limit_date)==str:
            point = difficulty * 3
        else:
            days_difference = (limit_date - today).days
            if days_difference > 0:
                point = difficulty * days_difference * 3
            elif days_difference == 0:
                point = difficulty * 2
            else:
                point = difficulty // -days_difference
        if point <= 0:
            point = 1
        
        self.add_point(point)
        
    def save(self): # ポイントを保存　使用法: save()
        self.user.save_to_file()
        
    def load(self):
        self.user.load_from_file()