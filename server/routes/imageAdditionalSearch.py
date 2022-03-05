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

        # 재료 id 불러오기(_in사용하기, like 사용하지 않고 변경하기)
        recipes_list = RecipesIngredients.query.join(RecipesIngredients.ingredients).filter(Ingredients.name.in_(ingredient_query_list)).all()
        print(len(recipes_list))

        if not recipes_list:
            return make_response([], 404)  

        recipes_dict = {}
        for recipe in recipes_list:
            if recipe.recipe_id not in recipes_dict:
                recipes_dict[recipe.recipe_id] = 1
            else:
                recipes_dict[recipe.recipe_id] += 1

        recipes_dict = sorted(recipes_dict.items(), key=lambda x:x[1], reverse=True)
        recipe_id_list = [i[0] for i in recipes_dict]
        print(recipe_id_list)

        all_recipe=[]
        for recipe_id in recipe_id_list:
            recipe_data = Recipes.query.filter(Recipes.id==recipe_id).first()
            
            category_list = recipe_data.categories
            kind = [x.name for x in  category_list if x.type=="kind"]

            recipe_dict = {
                               "recipe_id": recipe_id,
                               "main_image": recipe_data.main_image,
                               "name": recipe_data.name, 
                               "user_name" :recipe_data.users.nickname,
                               "kind" :  kind[0].name if kind[0] != None else None,
                            }

            all_recipe.append(recipe_dict)
        print(len(all_recipe))
       
        
        return make_response(jsonify(all_recipe), 200)