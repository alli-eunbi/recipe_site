import os

from flask import Blueprint, jsonify, request, g, send_file
from flask_restx import Namespace, Resource, fields
from models import Ingredients, db, Recipes, Categories, RecipesIngredients
from datetime import date, datetime

recipe_board_page = Blueprint('recipe_board_page', __name__, url_prefix='/recipe-board')
recipe_board_page_api = Namespace('recipe_board_page_api', path='/recipe-board')


# Ingredients테이블과 RecipesIngredients테이블에 데이터 넣는 함수
def input_ingredients_recipesingredients(ingredients, id):
  # 재료먼저 DB에 넣기
  for ingredient in ingredients:
    exec_ingredient = Ingredients.query.filter(Ingredients.name==ingredient).first()
    # 이미 있는 재료인 경우
    if exec_ingredient:
      continue
    # 없는 경우 추가해준다.
    new_ingredient = Ingredients(ingredient)
    db.session.add(new_ingredient)
    db.session.commit()

    new_RecipesIngredients = RecipesIngredients(id, new_ingredient.id)
    db.session.add(new_RecipesIngredients)
    db.session.commit()


@recipe_board_page_api.route('/register')
class Recipe_register(Resource):
  def post(self):
    # 데이터 전달
    request_json = request.form
    print('request_json: ', request_json)

    # 로그인된 유저 확인
    # if 'current_user' in g:
    #   user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
    # else:
    #   return jsonify({"success": True, "message": "로그인이 필요합니다."})
    user_id = 1
    # text 데이터 받기
    # recipe_name = request.form.get('recipe_name')
    recipe_name = request_json.get('recipe_name')
    method = request_json.get('method')
    occation = request_json.get('occation')
    kind = request_json.get('kind')
    cooking_step = request_json.get('cooking_step')
    serving = request_json.get('serving')
    time = request_json.get('time')
    total_ingredients = request_json.get('total_ingredients')
    cooking_image = []
    main_image = ''

    # 이미지 데이터 받기
    files = request.files('cooking_image')
    upload_time = datetime.now()
    print('recipe_name: ', recipe_name)
    print('method: ', method)

    print('request: ', request.form)

    print('files: ', files)
    print('files tyoe: ', type(files))
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
        main_image += url
      else:
        cooking_image.append(url)

    # Recipes 테이블과 Categories 테이블, Ingredients테이블, RecipesIngredients테이블에 데이터 저장하기
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
    
    # Ingredients, RecipesIngredients 테이블 저장하기
    vegetables = total_ingredients.get('재료')
    sauces = total_ingredients.get('양념')
    
    # 재료와 소스 DB에 넣기
    input_ingredients_recipesingredients(vegetables, new_recipe.id)
    input_ingredients_recipesingredients(sauces, new_recipe.id)
        
    
    return jsonify({"success": True, "message": "등록완료", "recipe_id": new_recipe.id})


@recipe_board_page_api.route('/test')
class Test(Resource):
  def get(self):
    # data = {"success": True, "url": "http://localhost:5000/static/20220225.jpg"}
    today = date.today()
    
    print('today: ', type(today))
    # today = today.replace('-','')
    return jsonify({'today': today})