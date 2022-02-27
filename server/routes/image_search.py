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

#인공지능 모델 import
from demo_detector_65 import predict_ver2_os as pv2


images_search = Blueprint('images_search', __name__, url_prefix='/recipes')
images_search_api = Namespace('search', path='/recipes')

parser = reqparse.RequestParser()
parser.add_argument("ing", type=str)

@images_search_api.route('/image-search', methods=['POST'])
class image_search(Resource):
    def post(self):
        try:
            file = request.files['file']

            #*post request에 file이 존재하는지 확인
            if 'file' not in request.files or file.filename == "":
                return make_response("사진을 전송하지 않았습니다.", 400)

            #*파일 저장
            full_filename = file.filename
            extension = full_filename.split('.')[-1]
            img_path = f"/app/demo_detector_65/img_test/test.{extension}"
            file.save(img_path)

            json_path = '/app/demo_detector_65/result/predicted_result.json'
            pv2.img_predictor(img_path, json_path)

            with open('/app/demo_detector_65/result/predicted_result.json', 'r', encoding='utf-8') as f:
                json_contents = f.read()
                result_data = json.loads(json_contents)
            ingredient_list = result_data['predicted_objects']

            if len(ingredient_list) ==0:
                if os.path.exists(img_path):   
                    os.remove(img_path)
                return make_response('검색된 재료가 없습니다.', 204)

            ingredient_names =[]
            all_recipes = []
            for ingredient in ingredient_list:
                ingredient_name = list(ingredient.items())[0][-1]
                ingredient_names.append(ingredient_name)

                ingredient_id= Ingredients.query.filter(Ingredients.name.like(ingredient_name)).first()
                recipes = RecipesIngredients.query.filter(RecipesIngredients.ingredients_id==ingredient_id.id).all()

                for recipe in recipes:
                    category_list = recipe.recipes.categories
                    occassion = [x for x in  category_list if x.type=="occation"]
                    method = [x for x in  category_list if x.type=="method"]
                    kind =[x for x in  category_list if x.type=="kind"]
                    recipe_dict = {
                                "recipe_id": recipe.recipes.id,
                                "main_image": recipe.recipes.main_image,
                                "mean_rating" : recipe.recipes.mean_rating,
                                "comment_counts" : Comments.query.filter(Comments.recipe_id==recipe.id).count(),
                                "name": recipe.recipes.name, 
                                "user_name" :recipe.recipes.users.nickname,
                                "method": method[0].name,
                                "occation" : occassion[0].name,
                                "kind" : kind[0].name,
                                }
                    all_recipes.append(recipe_dict)

            final_recipes = [i for n, i in enumerate(all_recipes) if i not in all_recipes[n + 1:]]

            #*이미지 삭제
            if os.path.exists(img_path):   
                os.remove(img_path)
                
            return make_response(jsonify({"ingredients": ingredient_names, "recipes":final_recipes}),200)
        
        except Exception as e:
            return make_response(jsonify({'message': 'error'}), 500)