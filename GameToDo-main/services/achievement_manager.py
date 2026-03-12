from models.user import User
from services.title_manager import TitleManager
import json

# achievement.json作成予定。{"count": 10, "type": "task"}...
class AchievementManager:   # 所持称号管理クラス
    
    def __init__(self, user: User):
        self.user = user

    def get_completed_task_count(self):          # タスク完了数を取得　使用法: get_completed_task_count()
        return self.user.get_achievement()["task"]
    
    def get_have_titles_count(self):             # 称号所持数を取得　使用法: get_have_titles_count()
        return self.user.get_achievement()["title"]
    
    def get_total_point_count(self):             # 総獲得ポイントを取得　使用法: get_total_point_count()
        return self.user.get_achievement()["point"]
        
    def get_completed_achievement(self):         # 完了した実績idのリストを取得　使用法: get_completed_achievement()
        # completed_achievement_id = [1, 5, 10, ...]
        return self.user.get_achievement()["completed_list"]

    def get_completed_achievement_count(self):    # 完了した実績数を取得　使用法: get_completed_achievement_count()
        return self.user.get_achievement()["complate"]
    
    def add_completed_task_count(self, count = 1):# タスク完了数を追加　使用法: add_completed_task_count()
        achievement = self.user.get_achievement()
        achievement["task"] += count
        self.user.set_achievement(achievement)
        
    def update_have_titles_count(self):           # 称号獲得数を更新　使用法: update_have_titles_count()
        achievement = self.user.get_achievement()
        achievement["title"] = len(self.user.get_has_titles())
        self.user.set_achievement(achievement)
    
    def add_total_point(self, point: int):   # 総獲得ポイントを追加　使用法: add_total_point_count()
        achievement = self.user.get_achievement()
        achievement["total_point"] += point
        self.user.set_achievement(achievement)
        
    def add_completed_achievement(self, id: int): # 完了した実績を追加　使用法: get_has_title()
        achievement = self.user.get_achievement()
        achievement["completed_list"].append(id)
        for v in self.get_achievements_json():
            if v.get("id") == id:
                TitleManager(self.user).add_title(v.get("reward"))
                print(v.get("reward"))
        achievement["completed"] = len(achievement["completed_list"])
        self.user.set_achievement(achievement)
    
    def get_achievements_json(self):
        with open('static/achievements.json') as f:
            jdata = json.load(f)
        return jdata
    
    def is_achieved(self):
        #exclude_achievement_ids = [901, 1000]
        jdata = self.get_achievements_json()
        items = []
        print("user_ac: ", self.user.get_achievement())
        for v in jdata:# 実績状況の取得かも。
            v["reward_content"] = TitleManager(self.user).get_title_content(v.get("reward"))
            if any([j == v.get("id") for j in self.user.get_achievement().get("completed_list")]):
                v["received"] = True
                items.append(v)
            else:
                v["received"] = False
                items.append(v)
        return items