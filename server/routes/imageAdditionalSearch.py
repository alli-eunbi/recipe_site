import sys
import os
import cv2
import json

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import argparse 
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Comments, Categories, Users


images_additional_search = Blueprint('/image/additional-search', __name__, url_prefix='/api/recipes')
images_additional_search_api = Namespace('search', path='/api/recipes')


@images_additional_search_api.route('/image/additional-search', methods=['GET'])
class image_search(Resource):
    def get(self):
        # try:
        ing_query= request.args.get('ing')
        ingredient_list = ing_query.split(" ")
        print(ingredient_list)
        kind_query = request.args.get('cat1')
        print(kind_query)
        method_query = request.args.get('cat2')
        occation_query = request.args.get('cat3')


        if ingredient_list[0] == '' or ing_query is None:
                return make_response("찾으실 재료를 입력해주세요.", 400)

        ingredient_id_list=[]
        for ingredient in ingredient_list:
            ingredient_id = Ingredients.query.filter(Ingredients.name.like(f'{ingredient}')).first()

            if ingredient_id != None and ingredient_id.id not in ingredient_id_list:
                ingredient_id_list.append(ingredient_id.id)

            if not ingredient_id_list:
                return make_response("해당하는 재료가 존재하지 않습니다.", 404)        
        
        all_recipes=[]
        for ingredient_id in ingredient_id_list:
            recipes= RecipesIngredients.query.filter(RecipesIngredients.ingredients_id==ingredient_id).all()

            for recipe in recipes:
                recipe_id = recipe.recipe_id
            
                category_list = recipe.recipes.categories
                occassion = [x.name for x in  category_list if x.type=="occation"]
                method = [x.name for x in  category_list if x.type=="method"]
                kind = [x.name for x in  category_list if x.type=="kind"]
                all_ingredients = RecipesIngredients.query.filter(RecipesIngredients.recipe_id==recipe_id).all()
                all_ingredients_ids = [x.ingredients_id for x in all_ingredients]

                additional_ingredients_id = list(set(all_ingredients_ids).difference(ingredient_id_list))
                additional_ingredients_name = [Ingredients.query.filter(Ingredients.id==x).first().name for x in additional_ingredients_id]

                # if  method_query != None or kind_query != None :
                recipe_dict = {
                                    "recipe_id": recipe_id,
                                    "main_image": recipe.recipes.main_image,
                                    "name": recipe.recipes.name, 
                                    "user_name" :recipe.recipes.users.nickname,
                                    "method": method[0],
                                    "occation" :  None if occassion[0]== "" else occassion[0],
                                    "kind" :  kind[0],
                                    "additional_ingredients": additional_ingredients_name
                                }

                all_recipes.append(recipe_dict)

        final_recipes = [i for n, i in enumerate(all_recipes) if i not in all_recipes[n + 1:]]

        #!addtional_ingredients가 없을 경우 sorted
        final_recipes_sorted = sorted(final_recipes, key=lambda x: len(x["additional_ingredients"]))      

        return make_response(jsonify({"recipes" : final_recipes_sorted}),200)
        
        # except Exception as e:
        #     return make_response(jsonify({'message': 'error'}), 500)