import os
import ast

from flask import Blueprint, jsonify, request, g, send_file
from flask_restx import Namespace, Resource, fields
from models import Ingredients, db, Recipes, Categories, RecipesIngredients
from datetime import date, datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func

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
        print({"success": False, "message": "로그인이 필요합니다."})
        return jsonify({"success": False, "message": "로그인이 필요합니다."})
      print('user_id: ', user_id, user_nickname)

      exec_recipe = Recipes.query.filter(Recipes.id==recipe_id).first()
      # 만약 사용자가 다른 경우
      if exec_recipe != user_id:
        return jsonify({"success": False, "message": "사용자가 일치하지 않습니다."})

      # 응답으로 담을 객체
      result = {}

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
      print('total_ingredients: ', total_ingredients)
      print('total_ingredients: ', type(total_ingredients))
      ingredients_list = total_ingredients.strip().split(', ')
      ingredients_list = [x.strip() for x in ingredients_list]
      print(ingredients_list)
      
      # 각 재료의 type을 찾아와야 한다.
      ingredients = []
      sauce = []
      recipes_ingredients = exec_recipe.recipes_ingredients
      for recipe_ingredient in recipes_ingredients:
        ingredient_type = recipe_ingredient.ingredients.type
        ingredient_name = recipe_ingredient.ingredients.name

        # total_ingredients에 작성되 네임
        for total_ingredient in ingredients_list:
          # 반건조 아귀 1팩', '콩나물 150g', '돌미나리 100g', '대파 1개'
          if ingredient_name in total_ingredient:
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
      print('e: ', e)
      return jsonify({"success": False, "message": "서버내부에러"})
    

      

