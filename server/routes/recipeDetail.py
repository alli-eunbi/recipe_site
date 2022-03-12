import ast

from flask import Blueprint, jsonify, make_response, g
from flask_restx import Namespace, Resource, fields
from models import *

recipe_detail = Blueprint('recipe_detail', __name__, url_prefix='/api/recipes')
recipe_detail_api = Namespace('recipe_detail_api', path='/api/recipes')

# 상세페이지 라우터
@recipe_detail_api.route('/<int:recipe_id>')
class ShowDetail(Resource):
    def get(self, recipe_id):
        try:
            recipe = Recipes.query.filter(Recipes.id==recipe_id).first()
            if not recipe:
                return make_response(jsonify({'message': 'no recipe'}), 404)
            recipe_name = recipe.name
            user_id = recipe.user_id # recipe 작성자
            user = Users.query.filter(Users.id==user_id).first()
            user_nickname = user.nickname # recipe 작성자의 닉네임
            main_image = recipe.main_image
            cooking_step = ast.literal_eval(recipe.cooking_step)
            cooking_image = ast.literal_eval(recipe.cooking_image)
            serving = recipe.serving
            time = recipe.time
            total_ingredients = recipe.total_ingredients
            created_at = str(recipe.created_at)

            categories = Categories.query.filter(Categories.recipe_id==recipe_id).all()
            for cate in categories:
                if cate.type == 'method':
                    method = cate.name
                elif cate.type == 'occation':
                    occation = cate.name
                elif cate.type == 'kind':
                    kind = cate.name

            ingredients_list = []
            ingres = RecipesIngredients.query.filter(RecipesIngredients.recipe_id==recipe_id).all()
            for ingre in ingres:
                ingredient = Ingredients.query.filter(Ingredients.id==ingre.ingredients_id).first()
                ingredients_list.append(ingredient.name)
            
            return make_response(jsonify({
                'recipe_id': recipe_id,
                'recipe_name': recipe_name,
                'user_id': user_id,
                'user_nickname': user_nickname,
                'main_image': main_image,
                'cooking_step': cooking_step,
                'cooking_image': cooking_image,
                'serving': serving,
                'time': time,
                'total_ingredients': total_ingredients,
                'created_at': created_at,
                'method': method,
                'occation': occation,
                'kind': kind,
                'ingredients_list': ingredients_list
            }), 200)
        except Exception as e:
            return make_response(jsonify({'message': 'error'}), 500)      