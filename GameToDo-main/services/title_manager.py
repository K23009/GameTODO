from models.user import User
import json

class TitleManager:   # 所持称号管理クラス
    
    def __init__(self, user: User):
        self.user = user
    
    def get_title1(self):          # 称号1を取得　使用法: get_title1()
        return self.user.get_title1()
    
    def get_title2(self):          # 称号2を取得　使用法: get_title2()
        return self.user.get_title2()
    
    def get_join_title(self):          # 接続用称号を取得　使用法: get_join_title()
        return self.user.get_join_title()
        
    def get_has_titles(self):          # 所持称号一覧を取得　使用法: get_has_title()
        return self.user.get_has_titles()

    def add_title(self, title_id):     # 称号を追加　使用法: add_point(称号のid)
        self.user.has_titles.append(title_id)
    
    def get_shop_titles_dict_list(self):
        exclude_title_ids = [901, 1000]
        jdata = self.titles_json()
        items = []
        for v in jdata:# idが1000以下の称号をショップに並べるための処理
            if not any([i == v.get("id") for i in exclude_title_ids]):
                if not any([j == v.get("id") for j in self.user.get_has_titles()]) and v.get("id") <= 1000:
                    v["have_this"] = False
                    items.append(v)
                elif any([j == v.get("id") for j in self.user.get_has_titles()]) and v.get("id") <= 1000:
                    v["have_this"] = True
                    items.append(v)
        return items

    def get_has_regular_titles_dict_list(self):
        jdata = self.titles_json()
        items = []
        for v in jdata:# 持っている称号
            if any([i == v.get("id") for i in self.user.get_has_titles()]) and (v.get("id") >= 1000 or v.get("id") <= 900):
                items.append(v)
        return items
    
    def get_has_join_titles_dict_list(self):
        jdata = self.titles_json()
        items = []
        for v in jdata:# 持っている称号
            if any([i == v.get("id") for i in self.user.get_has_titles()]) and v.get("id") < 1000 and v.get("id") > 900:
                items.append(v)
        return items
    
    def get_has_titles_dict_list(self):
        jdata = self.titles_json()
        items = []
        for v in jdata:# 持っている称号
            if any([i == v.get("id") for i in self.user.get_has_titles()]):
                items.append(v)
        return items
    
    def get_title_content(self, title_id):
        for v in self.titles_json():
            if title_id == v.get("id"):
                return v.get("content")
    
    def titles_json(self):
        with open('static/titles.json') as f:
            jdata = json.load(f)
        return jdata