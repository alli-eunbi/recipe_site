from flask import Blueprint, jsonify, request, g, send_file
from flask_restx import Namespace, Resource, fields
from models import Ingredients, db, Users, Recipes, Categories
import os
from datetime import date, datetime

recipe_board_page = Blueprint('recipe_board_page', __name__, url_prefix='/recipe-board')
recipe_board_page_api = Namespace('recipe_board_page_api', path='/recipe-board')




@recipe_board_page_api.route('/register')
class Recipe_register(Resource):
  def post(self):
    # 데이터 전달
    request_form = request.form
    print('request_form: ', request_form)

    # 로그인된 유저 확인
    if 'current_user' in g:
      user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
    else:
      return jsonify({"success": True, "message": "로그인이 필요합니다."})

    # text 데이터 받기
    recipe_name = request_form.get('recipe_name')
    method = request_form.get('method')
    occation = request_form.get('occation')
    kind = request_form.get('kind')
    cooking_step = request_form.get('cooking_step')
    serving = request_form.get('serving')
    time = request_form.get('time')
    total_ingredients = request_form.get('total_ingredients')
    cooking_image = []

    # 이미지 데이터 받기
    files = request.files.get('cooking_image')
    upload_time = datetime.now()

    # 폴더 이름 static/dir_name
    dir_name = f"{upload_time.year}{upload_time.day}{upload_time.second}{upload_time.microsecond}"
    # 폴더 만들기
    os.mkdir(f"static/{dir_name}")

    for key, value in files.items():
      file = value

      full_filename = file.filename
      extension = full_filename.split('.')[-1]

      save_file_name = f"static/{dir_name}/step0.{extension}"
      file.save(save_file_name)
      url = f"http://localhost:5000/{save_file_name}"
      if key == 'step0':
        main_image_url = url
      else:
        cooking_image.append(url)
    
    # 메인 이미지 저장
    main_image = main_image_url

    # Recipes 테이블과 Categories 테이블, Ingredients테이블, Recipes_ingredients테이블에 데이터 저장하기
    # Recipes 테이블 저장하기
    new_recipe = Recipes(user_id, recipe_name, main_image, cooking_step, cooking_image, serving, time, total_ingredients)
    db.session.add(new_recipe)
    db.session.commit()

    # Categories 테이블 저장하기
    for i in range(3):
      if i == 0:
        new_categories = Categories(new_recipe.id, method, 'method')
        db.session.add(new_categories)
        db.session.commit()
      elif i == 1:
        new_categories = Categories(new_recipe.id, occation, 'occation')
        db.session.add(new_categories)
        db.session.commit()
      else:
        new_categories = Categories(new_recipe.id, kind, 'kind')
        db.session.add(new_categories)
        db.session.commit()
    
    # Ingredients 테이블 저장하기
    
    # exec_ingredients = Ingredients.query.filter

        



        
    
    return jsonify({"success": True, "message": "등록완료", "recipe_id": new_recipe.id})


@recipe_board_page_api.route('/test')
class Test(Resource):
  def get(self):
    # data = {"success": True, "url": "http://localhost:5000/static/20220225.jpg"}
    today = date.today()
    
    print('today: ', type(today))
    # today = today.replace('-','')
    return jsonify({'today': today})