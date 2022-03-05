import sys
import os
import cv2
import json

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import argparse 
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from numpy import append
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Categories, Users


images_additional_search = Blueprint('/image/additional-search', __name__, url_prefix='/api/recipes')
images_additional_search_api = Namespace('search', path='/api/recipes')

#* word_search처럼 문자열 말고 빈 배열로 전달
@images_additional_search_api.route('/image/additional-search', methods=['GET'])
class image_search(Resource):
    def get(self):
        # try:
        ing_query= request.args.get('ing')
        ingredient_query_list = ing_query.split(" ")
        print(ingredient_query_list)

        if ingredient_query_list[0] == '' or ing_query is None:
                return make_response("찾으실 재료를 입력해주세요.", 400)

        # 재료 id 불러오기
        ingredient_id_list=[]
        for ingredient_name in ingredient_query_list:
            ingredient_item = Ingredients.query.filter(Ingredients.name.like(f'{ingredient_name}')).first()

            if ingredient_item != None and ingredient_item.id not in ingredient_id_list:
                ingredient_id_list.append(ingredient_item.id)

        if not ingredient_id_list:
            return make_response([], 404)        
        
        # 각 '재료의 레시피' id 불러오기
        recipes_ids=[]  
        for ingredient_id in ingredient_id_list:
            per_ingrement_recipes= RecipesIngredients.query.filter(RecipesIngredients.ingredients_id==ingredient_id).all()
            per_ingrement_recipes_ids = [_recipe.recipe_id for _recipe in per_ingrement_recipes]
            recipes_ids.extend(per_ingrement_recipes_ids)
        recipes_ids = list(set(recipes_ids))

#*코드 수정 방법 : append할때 처음부터 additional-순서로
        all_recipe=[]
        for recipe_id in recipes_ids:
            recipe_data = RecipesIngredients.query.filter(RecipesIngredients.recipe_id==recipe_id).first()
            
            category_list = recipe_data.recipes.categories
            kind = [x.name for x in  category_list if x.type=="kind"]

            recipe_dict = {
                               "recipe_id": recipe_id,
                               "main_image": recipe_data.recipes.main_image,
                               "name": recipe_data.recipes.name, 
                               "user_name" :recipe_data.recipes.users.nickname,
                               "kind" :  kind[0],
                            }

            all_recipe.append(recipe_dict)
        print(len(all_recipe))
  

        return make_response(jsonify({"recipes" : all_recipe}),200)
        
        # except Exception as e:
        #     return make_response(jsonify({'message': 'error'}), 500)



                    # all_ingredients = RecipesIngredients.query.filter(RecipesIngredients.recipe_id==recipe_id).all()
            # recipe_data = all_ingredients[0]
                    # all_ingredients_names = [x.ingredients.name for x in all_ingredients]
            # additional_ingredients_names = list(set(all_ingredients_names).difference(ingredient_name_list))
            # additional_ingredients_name = [Ingredients.query.filter(Ingredients.id==id).first().name for id in additional_ingredients_ids]
                    # final_recipes_sorted = sorted(all_recipe, key=lambda x: len(x["additional_ingredients"]))    
