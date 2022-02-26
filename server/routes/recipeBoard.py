import os
import ast

from flask import Blueprint, jsonify, request, g, send_file
from flask_restx import Namespace, Resource, fields
from models import Ingredients, db, Recipes, Categories, RecipesIngredients
from datetime import date, datetime

recipe_board_page = Blueprint('recipe_board_page', __name__, url_prefix='/recipe-board')
recipe_board_page_api = Namespace('recipe_board_page_api', path='/recipe-board')



# Ingredients테이블과 RecipesIngredients테이블에 데이터 넣는 함수
def input_ingredients_recipesingredients(ingredients, id):
  # ingredients가 NonType인지 확인
  if not ingredients:
    return

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

    print('id: ', id, 'ingre_id: ', new_ingredient.id)

    new_RecipesIngredients = RecipesIngredients(id, new_ingredient.id)
    db.session.add(new_RecipesIngredients)
    # db.session.commit()


@recipe_board_page_api.route('/register')
class Recipe_register(Resource):
  def post(self):
    # try:
      # 데이터 전달
      data = request.form.get('data')

      request_json = ast.literal_eval(data)

      # 로그인된 유저 확인
      # if 'current_user' in g:
      #   user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
      # else:
      #   return jsonify({"success": True, "message": "로그인이 필요합니다."})
      user_id = 3
      # text 데이터 받기
      # recipe_name = request.form.get('recipe_name')
      recipe_name = request_json.get('recipe_name')
      method = request_json.get('method')
      occation = request_json.get('occation')
      kind = request_json.get('kind')
      cooking_step = request_json.get('cooking_step')
      cooking_step = str(cooking_step)
      serving = request_json.get('serving')
      time = request_json.get('time')
      total_ingredients = request_json.get('total_ingredients')
      total_ingredients = ast.literal_eval(total_ingredients)
      step_count = int(request_json.get('step_count'))
      main_image = ''
      cooking_image = []

      # 이미지들을 받을 리스트
      images = []

      # 이미지 데이터 받기
      main_image_file = request.files.get('main_image')
      images.append(main_image_file)
      for i in range(step_count):
        data_name = f"step{i+1}"
        new_image = request.files.get(data_name)
        images.append(new_image)
      
      # 폴더 이름 static/dir_name
      upload_time = datetime.now()
      dir_name = f"{upload_time.year}{upload_time.day}{upload_time.second}{upload_time.microsecond}"
      # 폴더 만들기
      os.mkdir(f"static/{dir_name}")

      for i in range(len(images)):
        file = images[i]

        full_filename = file.filename
        extension = full_filename.split('.')[-1]

        save_file_name = f"static/{dir_name}/step{i}.{extension}"
        print('save_file_name: ', save_file_name)
        # file.save(save_file_name)
        url = f"http://localhost:5000/{save_file_name}"
        if i == 0:
          main_image += url
        else:
          cooking_image.append(url)
      
      # cooking_image리스트를 string 형식으로 바꾸기
      cooking_image = str(cooking_image)

      total_ingredients = str(total_ingredients)

      # Recipes 테이블과 Categories 테이블, Ingredients테이블, RecipesIngredients테이블에 데이터 저장하기
      # Recipes 테이블 저장하기
      new_recipe = Recipes(user_id, recipe_name, main_image, cooking_step, cooking_image, serving, time, total_ingredients)
      db.session.add(new_recipe)
      db.session.commit()

      # Categories 테이블 저장하기
      for i in range(3):
        print('recipe_id: ', new_recipe.id)
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
      total_ingredients = ast.literal_eval(total_ingredients)

      vegetables = total_ingredients.get('재료')
      sauces = total_ingredients.get('양념')

      print('new_id:', new_recipe.id)
      # 재료와 소스 DB에 넣기
      input_ingredients_recipesingredients(vegetables, new_recipe.id)
      input_ingredients_recipesingredients(sauces, new_recipe.id)
      
      for i in range(4):
        print('db: ', db.session)
      # db.session.commit()
      # db.session.commit()
      return jsonify({"success": True, "message": "등록완료", "recipe_id": new_recipe.id})
    # except Exception as e:
    #   print(e)
    #   return jsonify({"success": False, "message": "서버내부에러"})



@recipe_board_page_api.route('/test')
class Test(Resource):
  def get(self):
    # data = {"success": True, "url": "http://localhost:5000/static/20220225.jpg"}
    today = date.today()
    
    print('today: ', type(today))
    # today = today.replace('-','')
    return jsonify({'today': today})