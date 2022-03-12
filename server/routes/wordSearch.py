import argparse

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Categories, Users
from math import ceil
    
words_search = Blueprint('/word-search', __name__, url_prefix='/api/recipes')
words_search_api = Namespace('search', path='/api/recipes')

parser = reqparse.RequestParser()
parser.add_argument("ing", type=str)

@words_search_api.route('/word-search', methods=['GET'])
@words_search_api.expect(parser)
class word_search(Resource):
    def get(self):
        try:
            ing_query= request.args.get('ing')
            ingredient_query_list = ing_query.split(" ")
            page = request.args.get('page', 1, type=int)
            page_size = 20

            if ingredient_query_list[0] == '' or ing_query is None:
                all_recipe_count = Recipes.query.count()
                all_page_count = ceil(all_recipe_count / page_size)
                
                total_recipe = Recipes.query.order_by(Recipes.created_at.desc()).paginate(page, page_size,error_out=False)
                recipes = total_recipe.items
                
                pesco_count = Categories.query.filter(Categories.name=="페스코").count()
                vegan_count = Categories.query.filter(Categories.name=="비건").count()
                ovo_count = Categories.query.filter(Categories.name=="오보").count()
                lacto_count = Categories.query.filter(Categories.name=="락토").count()
                lacto_ovo_count=Categories.query.filter(Categories.name=="락토/오보").count()

                final_recipe=[]
                for recipe in  recipes:
                    category_list = recipe.categories
                    kind =[x.name for x in category_list if x.type=="kind"]

                    recipe_dict = {
                                "recipe_id": recipe.id,
                                "main_image": recipe.main_image,
                                "name": recipe.name, 
                                "user_name" :recipe.users.nickname,
                                "kind" : kind[0] if kind != [] else None,
                                }
                    final_recipe.append(recipe_dict)
                return make_response(jsonify({"recipes":final_recipe, "all_recipe_count":all_recipe_count, "all_page_count":all_page_count, "pesco_count":pesco_count,
                                      "vegan_count":vegan_count, "ovo_count":ovo_count, "lacto_count":lacto_count, "lacto_ovo_count":lacto_ovo_count}), 200)

            all_ingredients = []
            for ingredient in ingredient_query_list:
                ingredient_list = Ingredients.query.filter(Ingredients.name.like(f'%{ingredient}%')).all()
                all_ingredients.extend(ingredient_list)

            all_ingredients_ids = [ingredient.id for ingredient in all_ingredients]
            recipes_list = RecipesIngredients.query.join(RecipesIngredients.ingredients).filter(Ingredients.id.in_(all_ingredients_ids)).all()

            if len(recipes_list)==0 :
                return make_response(jsonify([]), 200)


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
          
            return make_response(jsonify({"recipes":all_recipe, "all_recipe_count":all_recipe_count, "all_page_count":all_page_count, "pesco_count":pesco_count,
                                      "vegan_count":vegan_count, "ovo_count":ovo_count, "lacto_count":lacto_count, "lacto_ovo_count":lacto_ovo_count}), 200)

        except Exception as e:
            return make_response(jsonify({'message': 'error'}), 500)
