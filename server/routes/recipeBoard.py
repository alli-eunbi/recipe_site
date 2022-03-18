import os
import ast

from flask import Blueprint, jsonify, request, g
from flask_restx import Namespace, Resource
from models import Ingredients, db, Recipes, Categories, RecipesIngredients
from datetime import date, datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

recipe_board_page = Blueprint('recipe_board_page', __name__, url_prefix='/api/recipe-board')
recipe_board_page_api = Namespace('recipe_board_page_api', path='/api/recipe-board')

engine = create_engine(f"mysql://{os.environ['DB_USER']}:{os.environ['DB_PASSWORD']}@mysql/final_project")
Session = sessionmaker(bind=engine)

# Ingredients테이블과 RecipesIngredients테이블에 데이터 넣는 함수
def input_ingredients_recipesingredients(ingredients, id, ingredient_type):
  try:
    # ingredients가 NonType인지 확인
    if not ingredients:
      return

    # 재료먼저 DB에 넣기
    for ingredient in ingredients:
      striped_ingredient = ingredient.strip()

      exec_ingredient = Ingredients.query.filter(Ingredients.name==striped_ingredient).first()
      # 없는 경우 추가해준다.
      if not exec_ingredient:
        new_ingredient = Ingredients(striped_ingredient, ingredient_type)
        db.session.add(new_ingredient)
        db.session.commit()

        new_RecipesIngredients = RecipesIngredients(id, new_ingredient.id)
        db.session.add(new_RecipesIngredients)
        db.session.commit()
      else:
        # 이미 있는 재료인 경우는 RecipesIngredients에만 추가해준다.
        new_RecipesIngredients = RecipesIngredients(id, exec_ingredient.id)
        db.session.add(new_RecipesIngredients)
        db.session.commit()
  except Exception as e:
    return jsonify({'success': False, 'message': '서버 내부 에러'})


@recipe_board_page_api.route('/register')
class Recipe_register(Resource):
  def post(self):
    try:
      # 로그인된 유저 확인
      if 'current_user' in g:
        user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
      else:
        return jsonify({"success": False, "message": "로그인이 필요합니다."})

      # 데이터 전달
      data = request.form.get('data')
      request_json = ast.literal_eval(data)

      # text 데이터 받기
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
      if not main_image_file:
        return jsonify({"success": False, "message": "메인 음식 이미지가 없습니다."})
      images.append(main_image_file)

      # 단계별 사진이 0장인 경우
      if step_count != 0:
        for i in range(step_count):
          data_name = f"step{i+1}"
          new_image = request.files.get(data_name)
          if not new_image:
            continue
          images.append(new_image)
      
      # 폴더 이름 static/dir_name
      upload_time = datetime.now()
      dir_name = f"{upload_time.year}{upload_time.day}{upload_time.second}{upload_time.microsecond}"
      # 폴더 만들기
      os.mkdir(f"recipe_images/{dir_name}")

      for i in range(len(images)):
        file = images[i]

        full_filename = file.filename
        extension = full_filename.split('.')[-1]

        save_file_name = f"recipe_images/{dir_name}/step{i}.{extension}"
        file.save(save_file_name)
        url = f"{os.environ['BASE_URL']}/{save_file_name}"
        if i == 0:
          main_image += url
        else:
          cooking_image.append(url)
      
      # cooking_image
      cooking_image = str(cooking_image)

      # total_ingredients를 DB에 담을 형식으로 변경해주시
      total_ingredients_for_db = ''
      vegetables = total_ingredients.get('재료')
      sauces = total_ingredients.get('양념')

      for vegetable in vegetables:
        total_ingredients_for_db += f"{vegetable} {vegetables.get(vegetable)}, "
      for sauce in sauces:
        total_ingredients_for_db += f"{sauce} {sauces.get(sauce)}, "

      # Recipes 테이블과 Categories 테이블, Ingredients테이블, RecipesIngredients테이블에 데이터 저장하기
      # Recipes 테이블 저장하기
      new_recipe = Recipes(user_id, recipe_name, main_image, cooking_step, cooking_image, serving, time, total_ingredients_for_db)
      with Session.begin() as session:
        session.add(new_recipe)
        nested = session.begin_nested()

        # Categories 테이블 저장하기
        for i in range(3):
          if i == 0:
            new_categories_0 = Categories(new_recipe.id, method, 'method')
          elif i == 1:
            new_categories_1 = Categories(new_recipe.id, occation, 'occation')
          else:
            new_categories_2 = Categories(new_recipe.id, kind, 'kind')
        session.add_all([new_categories_0, new_categories_1, new_categories_2])

        recipe_id = new_recipe.id
      # 재료와 소스 DB에 넣기
      input_ingredients_recipesingredients(vegetables, recipe_id, 1)
      input_ingredients_recipesingredients(sauces, recipe_id, 2)
      return jsonify({"success": True, "message": "등록완료", "recipe_id": recipe_id})
    except Exception as e:
      return jsonify({"success": False, "message": "서버내부에러"})


@recipe_board_page_api.route('/delete/<int:recipe_id>')
class Recipe_register(Resource):
  def delete(self, recipe_id):
    try:
      # recipe_id를 가지고 categories와 recips_ingredients 테이블을 먼저 삭제한 후
      # Recipes 테이블에서 삭제한다.
      if 'current_user' in g:
          user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
      else:
        return jsonify({"success": False, "message": "로그인이 필요합니다."})

      # 로그인 한 유저와 삭제에정인 레시피의 user_id가 같은지 확인한다.
      exec_recipe = Recipes.query.filter(Recipes.id==recipe_id).first()
      # 레시피가 존재하지 않는 경우
      if not exec_recipe:
        return jsonify({"success": False, "message": "레시피가 존재하지 않습니다."})

      if exec_recipe.user_id != user_id:
        return jsonify({"success": False, "message": "유저아이디가 일치하지 않습니다."})

      with Session.begin() as session:
        exec_recipe_ingredients = exec_recipe.recipes_ingredients
        exec_categories = exec_recipe.categories

        db.session.delete(exec_recipe)
        
        for exec_recipe_ingredient in exec_recipe_ingredients:
          db.session.delete(exec_recipe_ingredient)
        for exec_category in exec_categories:
          db.session.delete(exec_category)

        db.session.commit()
        return jsonify({"success": True, "message": "삭제완료"})
    except Exception as e:
      return jsonify({"success": False, "message": "서버내부에러"})