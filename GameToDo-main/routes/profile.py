from flask import Blueprint, render_template, request, redirect, url_for
import json
from services.point_manager import PointManager
from services.title_manager import TitleManager
from services.achievement_manager import AchievementManager
from models import User
# 多分ユーザー関連のデータベースかjson使います。

profile_bp = Blueprint('profile', __name__, url_prefix='/profile')
user = User()
user.load_from_file()
point_manager = PointManager(user)
title_manager = TitleManager(user)
acma = AchievementManager(user)

@profile_bp.route('/')
def index():
    items = title_manager.get_has_regular_titles_dict_list()
    
    has_regular_titles = title_manager.get_has_regular_titles_dict_list()
    has_join_titles = title_manager.get_has_join_titles_dict_list()
    
    cur_title = {"t1": title_manager.get_title1(), "t2": title_manager.get_title2(), "tjoin": title_manager.get_join_title()}
    card = user.get_card()
    user_achievement = user.get_achievement()

    return render_template('profile_mycard.html', user=user.get_name(), items=items, cur_title=cur_title, has_regular_titles=has_regular_titles, has_join_titles=has_join_titles, card=card, user_achievement=user_achievement, point=point_manager.get_point())

@profile_bp.route('/my-card')
def mycard():
    items = title_manager.get_has_regular_titles_dict_list()
    
    has_regular_titles = title_manager.get_has_regular_titles_dict_list()
    has_join_titles = title_manager.get_has_join_titles_dict_list()
    
    cur_title = {"t1": title_manager.get_title1(), "t2": title_manager.get_title2(), "tjoin": title_manager.get_join_title()}
    card = user.get_card()
    user_achievement = user.get_achievement()

    return render_template('profile_mycard.html', user=user.get_name(), items=items, cur_title=cur_title, has_regular_titles=has_regular_titles, has_join_titles=has_join_titles, card=card, user_achievement=user_achievement, point=point_manager.get_point())

@profile_bp.route('/others-card')
def otherscard():
    return render_template('profile_otherscard.html')

@profile_bp.route('/achievement')
def achievement():
    user_achievement = user.get_achievement()
    return render_template('achievement.html', items=acma.is_achieved(), cur_counts=user_achievement)

@profile_bp.route('/shop')
def shop():
    items = title_manager.get_shop_titles_dict_list()
    return render_template('shop.html', point=point_manager.get_point(), items=items)

@profile_bp.route('/send_data_to_flask', methods=['POST'])
def receive_data_from_js():
    # Ajaxリクエストからデータを受け取る
    data_received = request.get_json()
    point_manager.set_point(data_received)
    user.save_to_file()
    return 'Data received successfully!'

@profile_bp.route('/buy_title', methods=['POST'])
def buy_title():
    # Ajaxリクエストからデータを受け取る
    data_received = request.get_json()
    title_manager.add_title(data_received)
    acma.update_have_titles_count()
    user.save_to_file()
    return 'Data received successfully!'

@profile_bp.route('/received_achievement', methods=['POST'])
def received_achievement():
    # Ajaxリクエストからデータを受け取る
    data_received = request.get_json()
    print("ac: ", data_received)
    print("ac_type: ", type(data_received))
    acma.add_completed_achievement(data_received)
    
    acma.update_have_titles_count()
    user.save_to_file()
    return 'Data received successfully!'

@profile_bp.route('/edit', methods = ['POST'])
def edit():
    name = request.form['name']
    title1 = int(request.form['title1'])
    title2 = int(request.form['title2'])
    join_title = int(request.form['join_title'])
    
    user.set_name(name)
    user.set_title1(title1)
    user.set_title2(title2)
    user.set_join_title(join_title)
    
    bg_pattern = int(request.form.get('bg_pattern'))
    bg1_color = request.form.get('color_picker_bg1')
    bg2_color = request.form.get('color_picker_bg2')
    name_color = request.form.get('color_picker_name')
    other_color = request.form.get('color_picker_other')
    
    user.set_card(bg_pattern, name_color, bg1_color, bg2_color, other_color)
    
    user.save_to_file()
    return redirect(url_for('profile.index'))