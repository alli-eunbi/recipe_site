from operator import and_
import sys
import os
import cv2
import json

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import *
import argparse 
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from numpy import append
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Categories, Users


images_additional_search = Blueprint('/image-search', __name__, url_prefix='/api/recipes')
images_additional_search_api = Namespace('search', path='/api/recipes')

#* word_search처럼 문자열 말고 빈 배열로 전달
@images_additional_search_api.route('/image-search', methods=['GET'])
class image_search(Resource):
    def get(self):
        try:
            ing_query= request.args.get('ing')
            page = request.args.get('page', 1, type=int)
            page_size = 20

            ingredient_query_list = ing_query.split(" ")

            if ingredient_query_list[0] == '' or ing_query is None:
                    return make_response("찾으실 재료를 입력해주세요.", 400)

            # 재료 id 불러오기(_in사용하기, like 사용하지 않고 변경하기)
            recipes_list = RecipesIngredients.query.join(RecipesIngredients.ingredients).filter(Ingredients.name.in_(ingredient_query_list)).all()

            if not recipes_list:
                return make_response(jsonify([]), 404)  

            recipes_dict = {}
            categories_dict = {"페스코":0, "비건":0, "락토":0, "오보":0, "락토/오보":0}
            for recipe in recipes_list:
                if recipe.recipe_id not in recipes_dict:
                    recipes_dict[recipe.recipe_id] = 1
                    kind =[x.name for x in recipe.recipes.categories if x.type=="kind"]
                    if kind[0] != None:
                        categories_dict[kind[0]] +=1
                else:
                    recipes_dict[recipe.recipe_id] += 1

            recipes_dict = sorted(recipes_dict.items(), key=lambda x:x[1], reverse=True)
            recipe_id_list = [i[0] for i in recipes_dict]
            pesco_count = categories_dict["페스코"]
            vegan_count = categories_dict["비건"]
            ovo_count = categories_dict["오보"]
            lacto_count = categories_dict["락토"] 
            lacto_ovo_count=categories_dict["락토/오보"]
            
            all_recipe_count = len(recipe_id_list)
            all_page_count = ceil(all_recipe_count / page_size)

            i=(page-1)*page_size
            paginate_recipe_list=recipe_id_list[i:i+20]
            all_recipe=[]
            for recipe_id in paginate_recipe_list:
                recipe_data = Recipes.query.filter(Recipes.id==recipe_id).first()
                
                category_list = recipe_data.categories
                kind =[x.name for x in category_list if x.type=="kind"]

                recipe_dict = {
                                "recipe_id": recipe_id,
                                "main_image": recipe_data.main_image,
                                "name": recipe_data.name, 
                                "user_name" :recipe_data.users.nickname,
                                "kind" : kind[0] if kind != [] else None,
                                }
                all_recipe.append(recipe_dict)
            print(len(all_recipe))
        
            
            return make_response(jsonify({"recipes":all_recipe, "all_recipe_count":all_recipe_count, "all_page_count":all_page_count, "pesco_count":pesco_count,
                                        "vegan_count":vegan_count, "ovo_count":ovo_count, "lacto_count":lacto_count, "lacto_ovo_count":lacto_ovo_count}), 200)
        
        except Exception as e:
            return make_response(jsonify({'message': 'error'}), 500)