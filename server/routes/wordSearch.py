import argparse

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Categories, Users
    
words_search = Blueprint('/word/search', __name__, url_prefix='/api/recipes')
words_search_api = Namespace('search', path='/api/recipes')

parser = reqparse.RequestParser()
parser.add_argument("ing", type=str)

@words_search_api.route('/word/search', methods=['GET'])
@words_search_api.expect(parser)
class word_search(Resource):
    def get(self):
        # try:
            ing_query= request.args.get('ing')
            ingredient_list = ing_query.split(" ")

            if ingredient_list[0] == '' or ing_query is None:
                total_recipe = Recipes.query.all()
                final_recipe=[]

                for recipe in  total_recipe:
                    category_list = recipe.categories
                    kind =[x for x in  category_list if x.type=="kind"]
                    recipe_dict = {
                                "recipe_id": recipe.id,
                                "main_image": recipe.main_image,
                                "name": recipe.name, 
                                "user_name" :recipe.users.nickname,
                                "kind" : kind[0].name,
                                }
                    final_recipe.append(recipe_dict)
                return make_response(jsonify(final_recipe), 200)

            all_recipes = []
            for ingredient in ingredient_list:
                ingredient_id_list = Ingredients.query.filter(Ingredients.name.like(f'%{ingredient}%')).all()
                for ingredient_id in ingredient_id_list:
                    recipes= RecipesIngredients.query.filter(RecipesIngredients.ingredients_id ==ingredient_id.id).all()

                    if len(recipes)==0 :
                        return make_response(jsonify([]))

                    for recipe in recipes:
                        category_list = recipe.recipes.categories
                        kind =[x for x in  category_list if x.type=="kind"]
                        recipe_dict = {
                                    "recipe_id": recipe.recipes.id,
                                    "main_image": recipe.recipes.main_image,
                                    "name": recipe.recipes.name, 
                                    "user_name" :recipe.recipes.users.nickname,
                                    "kind" : kind[0].name,
                                    }
                        all_recipes.append(recipe_dict)
            final_recipes = [i for n, i in enumerate(all_recipes) if i not in all_recipes[n + 1:]]

            return make_response(jsonify(final_recipes), 200)

        # except Exception as e:
        #     return make_response(jsonify({'message': 'error'}), 500)
