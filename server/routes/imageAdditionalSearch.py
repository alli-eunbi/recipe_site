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
from models import db, Recipes, RecipesIngredients, Ingredients, Comments, Categories, Users


images_additional_search = Blueprint('/image/additional-search', __name__, url_prefix='/api/recipes')
images_additional_search_api = Namespace('search', path='/api/recipes')


@images_additional_search_api.route('/image/additional-search', methods=['GET'])
class image_search(Resource):
    def get(self):
        # try:
        ing_query= request.args.get('ing')
        ingredient_query_list = ing_query.split(" ")
        print(ingredient_query_list)
        kind_query = request.args.get('cat1')
        print(kind_query)
        method_query = request.args.get('cat2')
        occation_query = request.args.get('cat3')


        if ingredient_query_list[0] == '' or ing_query is None:
                return make_response("찾으실 재료를 입력해주세요.", 400)

        # 재료 id 불러오기
        ingredient_id_list=[]
        for ingredient_name in ingredient_query_list:
            ingredient_item = Ingredients.query.filter(Ingredients.name.like(f'{ingredient_name}')).first()

            if ingredient_item != None and ingredient_item.id not in ingredient_id_list:
                ingredient_id_list.append(ingredient_item.id)

        if not ingredient_id_list:
            return make_response("해당하는 재료가 존재하지 않습니다.", 404)        
        
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
            all_ingredients = RecipesIngredients.query.filter(RecipesIngredients.recipe_id==recipe_id).all()
            
            category_list = recipe_data.recipes.categories
            occassion = [x.name for x in  category_list if x.type=="occation"]
            method = [x.name for x in  category_list if x.type=="method"]
            kind = [x.name for x in  category_list if x.type=="kind"]
            filtered = False
            for _recipe in per_ingrement_recipes:
                # 여기서 필터링 되면 
                filtered =True
                # 마지막 이고 filter되지 않았다면 추가
                if filter==False:
                    per_ingrement_recipes_ids.append(_recipe.id)
            recipe_data=all_ingredients[0]
            
            
            all_ingredients_ids = [x.ingredients_id for x in all_ingredients]
            additional_ingredients_ids = list(set(all_ingredients_ids).difference(ingredient_id_list))
            additional_ingredients_name = [Ingredients.query.filter(Ingredients.id==id).first().name for id in additional_ingredients_ids]

            # if  method_query != None or kind_query != None :
            recipe_dict = {
                               "recipe_id": recipe_id,
                               "main_image": recipe_data.recipes.main_image,
                               "name": recipe_data.recipes.name, 
                               "user_name" :recipe_data.recipes.users.nickname,
                               "method": method[0],
                               "occation" :  None if occassion[0]== "" else occassion[0],
                               "kind" :  kind[0],
                               "additional_ingredients": additional_ingredients_name
                            }

            all_recipe.append(recipe_dict)

        final_recipes_sorted = sorted(all_recipe, key=lambda x: len(x["additional_ingredients"]))      

        return make_response(jsonify({"recipes" : final_recipes_sorted}),200)
        
        # except Exception as e:
        #     return make_response(jsonify({'message': 'error'}), 500)