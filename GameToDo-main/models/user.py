import json
import os
import uuid

USER_FILE_PATH = 'data/user.json' # ユーザー情報を保存するファイルのパス
class User: # ユーザー情報を保持するクラス(基本的にユーザー名の変更や表示のみに使うこと)
    def __init__(self):
        self.name = 'user'
        self.point = 0
        self.uuid = str(uuid.uuid4())
        
        # 称号用の変数
        self.title1 = 1001
        self.title2 = 1002
        self.join_title = 901
        self.has_titles = [901, 1001, 1002]
        # カード用の変数
        self.card = {"bg_pattern": 0, "name_color": "#000000", "bg1_color": "#ffffff", "bg2_color": "#000000", "other_color": "#000000"}
        self.achievement = {"task": 0, "title": 3, "total_point": 0, "completed": 0,  "completed_list": []}
        
        self.load_from_file()
    # 以下のメソッドのうち、point系のメソッドはpoint_manager.pyで統一して使用すること
    
    def __str__(self):
        return f'{{"name": "{self.name}", "point": {self.point}}}'
    
    def get_name(self):         # ユーザー名を取得
        self.load_from_file()
        return self.name
    
    def get_uuid(self):
        return self.uuid
    
    def get_point(self):        # ポイントを取得　point_manager.pyの方を使用すること
        return self.point
    
    def get_title1(self):       # 称号1を取得
        return self.title1
    
    def get_title2(self):       # 称号2を取得
        return self.title2
    
    def get_join_title(self):   # 接続用の称号を取得
        return self.join_title
    
    def get_has_titles(self):   # 所持称号一覧を取得
        return self.has_titles
    
    def get_card(self):         # カード関連の情報を取得
        return self.card
    
    def get_achievement(self):  # 実績関連の情報を取得
        return self.achievement
    
    def set_name(self, name):   # ユーザー名を設定
        self.name = name
        
    def set_point(self, point): # ポイントを設定　point_manager.pyの方を使用すること
        self.point = point
    
    def set_title1(self, title1):# 称号1を設定
        self.title1 = title1
    
    def set_title2(self, title2):# 称号2を設定
        self.title2 = title2
    
    def set_join_title(self, join_title):# 接続用の称号を設定
        self.join_title = join_title
    
    def set_has_titles(self, has_titles):# 所持称号一覧を設定
        self.has_titles = has_titles
    
    def set_card(self, bg_pattern: int, name_color: str, bg1_color: str, bg2_color: str, other_color: str):
        card = {"bg_pattern": bg_pattern, "name_color": name_color, "bg1_color": bg1_color, "bg2_color": bg2_color, "other_color": other_color}
        self.card = card
    
    def set_achievement(self, achievement):  # 実績関連の情報を設定
        self.achievement = achievement
        self.save_to_file()
    
    # JSONファイルに保存
    def save_to_file(self):
        data = {"name": self.name,
                "uuid": self.uuid,
                "point": self.point,
                "title1": self.title1,
                "title2": self.title2,
                "join_title": self.join_title,
                "has_titles": sorted(list(set(self.has_titles))),
                "card" : self.card,
                "achievement" : self.achievement,
                }
        os.makedirs(os.path.dirname(USER_FILE_PATH), exist_ok=True)
        with open(USER_FILE_PATH, 'w') as file:
            json.dump(data, file)

    # JSONファイルから読み込み
    def load_from_file(self):
        if os.path.exists(USER_FILE_PATH):
            try:
                with open(USER_FILE_PATH, 'r') as file:
                    data = json.load(file)
                    self.name = data.get("name")
                    self.uuid = data.get("uuid")
                    self.point = data.get("point")
                    self.title1 = data.get("title1")
                    self.title2 = data.get("title2")
                    self.join_title = data.get("join_title")
                    self.has_titles = data.get("has_titles")
                    self.card = data.get("card", {"bg_pattern", "name_color", "bg1_color", "bg2_color", "other_color"})
                    self.achievement = data.get("achievement", {"task", "title", "total_point", "completed", "completed_list"})
            except json.JSONDecodeError:
                print("JSONファイルが壊れています。デフォルト値を使用します。")
                self.name = "user"
                self.uuid = str(uuid.uuid4())
                self.point = 0
                self.title1 = 1001
                self.title2 = 1002
                self.join_title = 901
                self.has_titles = [901, 1001, 1002]
                self.card = {"bg_pattern": 0, "name_color": "#000000", "bg1_color": "#ffffff", "bg2_color": "#000000", "other_color": "#000000"}
                self.achievement = {"task": 0, "title": 3, "total_point": 0, "completed": 0,  "completed_list": []}
        else:
            # ファイルが存在しない場合、デフォルト値を設定
            self.name = "user"
            self.uuid = str(uuid.uuid4())
            self.point = 0 
            self.title1 = 1001
            self.title2 = 1002
            self.join_title = 901
            self.has_titles = [901, 1001, 1002]
            self.card = {"bg_pattern": 0, "name_color": "#000000", "bg1_color": "#ffffff", "bg2_color": "#000000", "other_color": "#000000"}
            self.achievement = {"task": 0, "title": 3, "total_point": 0, "completed": 0, "completed_list": []}
            self.save_to_file()