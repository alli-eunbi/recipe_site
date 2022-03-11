import os
import ast
import shutil

from flask import Blueprint, jsonify, request, g
from flask_restx import Namespace, Resource
from models import Ingredients, db, Recipes, Categories, RecipesIngredients
from datetime import date, datetime
from routes.recipeBoard import input_ingredients_recipesingredients

recipe_update_board_page = Blueprint('recipe_update_board_page', __name__, url_prefix='/api/recipe-board')
recipe_update_board_page_api = Namespace('recipe_update_board_page_api', path='/api/recipe-board')

@recipe_update_board_page_api.route('/update/<int:recipe_id>')
class Recipe_Update(Resource):
  def get(self, recipe_id):
    try:
      # 로그인된 유저 확인
      if 'current_user' in g:
        user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
      else:
        return jsonify({"success": False, "message": "로그인이 필요합니다."})

      exec_recipe = Recipes.query.filter(Recipes.id==recipe_id).first()
      # 만약 사용자가 다른 경우
      if exec_recipe.user_id != user_id:
        return jsonify({"success": False, "message": "사용자가 일치하지 않습니다."})

      # 응답으로 담을 객체
      result = {}
      result['recipe_id'] = recipe_id
      result['recipe_name'] = exec_recipe.name    
      for category in exec_recipe.categories:
        result[category.type] = category.name
      result['serving'] = exec_recipe.serving
      result['time'] = exec_recipe.time

      # ingredients, sauce, cokking_step, step_number를 저장해야한다.
      cooking_steps = ast.literal_eval(exec_recipe.cooking_step)
      cooking_step = {}
      step_number = []
      for index, value in enumerate(cooking_steps):
        cooking_step[index] = value
        step_number.append(index)
      
      result['cooking_step'] = cooking_step
      result['step_number'] = step_number

      total_ingredients = exec_recipe.total_ingredients
      ingredients_list = total_ingredients.strip(',').split(',')
      ingredients_list = [x.strip() for x in ingredients_list][:-1]
      
      # 각 재료의 type을 찾아와야 한다.
      ingredients = []
      sauce = []
      recipes_ingredients = exec_recipe.recipes_ingredients
      for recipe_ingredient in recipes_ingredients:
        ingredient_type = recipe_ingredient.ingredients.type
        ingredient_name = recipe_ingredient.ingredients.name
        # total_ingredients에 작성되 네임
        for total_ingredient in ingredients_list:
          if ingredient_name == total_ingredient.split(' ')[0]:
            _total_ingredient = total_ingredient.split(' ')
            input_list = [ingredient_name, '적당량'] if len(_total_ingredient)==1 else [ingredient_name, _total_ingredient[-1]]

            if ingredient_type == 1:
              ingredients.append(input_list)
            else:
              sauce.append(input_list)
      
      result['ingredients'] = ingredients
      result['sauce'] = sauce
      return jsonify({"success": True, "message": "기존 레시피 정보 전달 성공", "data": result})
    except Exception as e:
      return jsonify({"success": False, "message": "서버내부에러"})
  
  
  def post(self, recipe_id):
    try:
      # 로그인된 유저 확인
      if 'current_user' in g:
        user_id, user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
      else:
        return jsonify({"success": False, "message": "로그인이 필요합니다."})

      exec_recipe = Recipes.query.filter(Recipes.id==recipe_id).first()
      # 만약 사용자가 다른 경우
      if exec_recipe.user_id != user_id:
        return jsonify({"success": False, "message": "사용자가 일치하지 않습니다."})
      
      # 데이터 전달
      data = request.form.get('data')
      request_json = ast.literal_eval(data)
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
      # cooking_image를 string 형식으로 바꾸기
      cooking_image = str(cooking_image)

      # total_ingredients를 DB에 담을 형식으로 변경해주시
      total_ingredients_for_db = ''
      vegetables = total_ingredients.get('재료')
      sauces = total_ingredients.get('양념')

      for vegetable in vegetables:
        total_ingredients_for_db += f"{vegetable} {vegetables.get(vegetable)}, "
      for sauce in sauces:
        total_ingredients_for_db += f"{sauce} {sauces.get(sauce)}, "

      # 기존 url에서 폴더이름 빼오기
      exec_url = exec_recipe.main_image
      exec_dir_name = exec_url.split('/')[-2]
      exec_dir_name = f"recipe_images/{exec_dir_name}/"
      shutil.rmtree(exec_dir_name)

      # 기존 recipe 테이블 수정
      exec_recipe.name = recipe_name
      exec_recipe.main_image = main_image
      exec_recipe.cooking_step = cooking_step
      exec_recipe.cooking_image = cooking_image
      exec_recipe.serving = serving
      exec_recipe.time = time
      exec_recipe.total_ingredients = total_ingredients_for_db

      for category in exec_recipe.categories:
        if category.type == 'method':
          category.name = method
        elif category.type == 'occation':
          category.name = occation
        else:
          category.name = kind
      db.session.commit()
      
      # 기존 RecipesIngredient 삭제하기
      exec_RecipesIngredients = RecipesIngredients.query.filter(RecipesIngredients.recipe_id==recipe_id).all()
      for exec_recipeIngredient in exec_RecipesIngredients:
        db.session.delete(exec_recipeIngredient)
      db.session.commit()

      # 재료와 소스 DB에 넣기
      input_ingredients_recipesingredients(vegetables, recipe_id, 1)
      input_ingredients_recipesingredients(sauces, recipe_id, 2)
      return jsonify({"success": True, "message": "등록완료", "recipe_id": recipe_id})
    except Exception as e:
      return jsonify({"success": False, "message": "서버내부에러"})
    

      

