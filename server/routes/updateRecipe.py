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
    cooking_step = ast.literal_eval(exec_recipe.cooking_step)

    return 'ok'
    

      

