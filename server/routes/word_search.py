import argparse

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Comments, Categories, Users
    
words_search = Blueprint('words_search', __name__, url_prefix='/recipes')
words_search_api = Namespace('search', path='/recipes')

parser = reqparse.RequestParser()
parser.add_argument("ing", type=str)

#?앞으로 할일
##?속도줄이기

@words_search_api.route('/word-search', methods=['GET'])
@words_search_api.expect(parser)
class word_search(Resource):
    def get(self):
        # try:
            total_recipe = []
            ing_query= request.args.get('ing')

            #*쿼리자체가 없는 경우(=입력값이 없는 경우) 전체 레시피 데이터 보냄
            if ing_query is None:
                total_recipe = Recipes.query.all()
                final_recipe=[]

                for r in total_recipe:
                    category_list = Categories.query.filter(Categories.recipe_id==r.id).all()
                    kind_class = list(filter(lambda category: category.type=="kind", category_list))
                    occassion_class = list(filter(lambda category: category.type=="occation", category_list))
                    method_class = list(filter(lambda category: category.type=="method", category_list))
                    user = Users.query.filter(Users.id==r.user_id).first()
                    recipe = {
                        "recipe_id": r.id,
                        "main_image": r.main_image,
                        "mean_rating" : r.mean_rating,
                        "comment_counts" : Comments.query.filter(Comments.recipe_id==r.id).count(),
                        "name": r.name, 
                        "user_name" :user.nickname,
                        "method": method_class[0].name,
                        "occation" : occassion_class[0].name,
                        "kind" : kind_class[0].name,
                        }
                    final_recipe.append(recipe)
                return make_response(jsonify(final_recipe), 200)
            
            #*쿼리로 받은 ing를 공백 기준으로 나눠서 리스트로 저장
            # print(ing_query)
            # d = ing_query.strip()
            # print(d)
            ing_list = ing_query.split(" ")
            # ing_list = [lambda x: x.strip(), ing_list]
            # print(ing_list)
            
            # #*"ing="까지 입력했지만 검색할 재료 자체는 비어있는 경우(=입력값이 없는 경우) 전체 레시피 데이터 보냄
            if ing_list[0] == '':
                total_recipe = Recipes.query.all()
                final_recipe=[]

                for r in total_recipe:
                    category_list = Categories.query.filter(Categories.recipe_id==r.id).all()
                    kind_class = list(filter(lambda category: category.type=="kind", category_list))
                    occassion_class = list(filter(lambda category: category.type=="occation", category_list))
                    method_class = list(filter(lambda category: category.type=="method", category_list))
                    user = Users.query.filter(Users.id==r.user_id).first()
                    recipe = {
                        "recipe_id": r.id,
                        "main_image": r.main_image,
                        "mean_rating" : r.mean_rating,
                        "comment_counts" : Comments.query.filter(Comments.recipe_id==r.id).count(),
                        "name": r.name, 
                        "user_name" :user.nickname,
                        "method": method_class[0].name,
                        "occation" : occassion_class[0].name,
                        "kind" : kind_class[0].name,
                        }
                    final_recipe.append(recipe)
                return make_response(jsonify(final_recipe), 200)

            #*ing_list의 값들을 조회하여 재료 및 레시피 검색
            per_ingrement_total_recipe = []
            for ingredient in ing_list:
                print(ingredient)
                #*재료에 해당하는 재료 id 검색
                ing_id = Ingredients.query.filter(Ingredients.name.like(f'%{ingredient}%')).all()
                #!동일한 이름의 재료가 없는 경우
                if len(ing_id)==0 :
                    return make_response("해당하는 재료가 없습니다.", 404)

                #*재료 id가 들어간 레시피 id 검색
                #*ing_id의 재료 리스트에서 하나의 재료씩 꺼내서 레시피 검색
                for i in ing_id :
                    recipes_ingrement_ids =RecipesIngredients.query.filter(RecipesIngredients.ingredients_id==i.id).all()
                    
                    per_ingrement_per_recipe=[]
                    #*total_recipe_ids의 레시피 리스트에서 하나의 레시피 id씩 꺼내서 레시피 검색
                    for recipes_ingrement_id in recipes_ingrement_ids:
                        recipes_data =Recipes.query.filter(Recipes.id==recipes_ingrement_id.recipe_id).all()
                        category_list = Categories.query.filter(Categories.recipe_id==recipes_ingrement_id.recipe_id).all()

                        kind_class = list(filter(lambda category: category.type=="kind", category_list))
                        occassion_class = list(filter(lambda category: category.type=="occation", category_list))
                        method_class = list(filter(lambda category: category.type=="method", category_list))

                        
                        for r in recipes_data:
                            user = Users.query.filter(Users.id==r.user_id).first()
                            recipe = {
                                "recipe_id": r.id,
                                "main_image": r.main_image,
                                "mean_rating" : r.mean_rating,
                                "comment_counts" : Comments.query.filter(Comments.recipe_id==r.id).count(),
                                "name": r.name, 
                                "user_name" :user.nickname,
                                "method": method_class[0].name,
                                "occation" : occassion_class[0].name,
                                "kind" : kind_class[0].name,
                            }
                            per_ingrement_per_recipe.append(recipe)
                    print("재료당 :", len(per_ingrement_per_recipe))

                #*다음재료 조회시 리스트에 append하기                    
                per_ingrement_total_recipe.extend(per_ingrement_per_recipe)
            print("중복 미제거 총레시피:", len(per_ingrement_total_recipe))
            total_recipe.extend(per_ingrement_total_recipe)

            #*중복제거
            final_recipe = list({r['recipe_id']: r for r in total_recipe}.values())
            print("최종레시피:", len(final_recipe))
        
        # except Exception as e:
        #     return make_response(jsonify({'message': 'error'}), 500)
        #*최종 return은 final_recipe
            return make_response(jsonify(final_recipe), 200)
