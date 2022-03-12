import sys
import os
import cv2
import json

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Nutritions

#인공지능 모델 import
from demo_detector_65 import predict_ver2_os as pv2

images_search = Blueprint('/image/search', __name__, url_prefix='/api/ingredients')
images_search_api = Namespace('search', path='/api/ingredients')


@images_search_api.route('/image/search', methods=['POST'])
class image_search(Resource):
    def post(self):
        try:
            file = request.files['file']

            #*post request에 file이 존재하는지 확인
            if 'file' not in request.files or file.filename == "":
                return make_response("사진을 전송하지 않았습니다.", 400)

            #*파일 저장
            full_filename = file.filename
            extension = full_filename.split('.')[-1].lower()
            img_path = f"/app/demo_detector_65/img_test/test.{extension}"
            file.save(img_path)

            #* 인공지능 모델 검출 결과 저장(json)
            json_path = '/app/demo_detector_65/result/predicted_result.json'
            pv2.img_predictor(img_path, json_path)

            with open('/app/demo_detector_65/result/predicted_result.json', 'r', encoding='utf-8') as f:
                json_contents = f.read()
                result_data = json.loads(json_contents)
            ingredient_list = result_data['predicted_objects']

            if ingredient_list is None or len(ingredient_list) ==0:
                return make_response(jsonify([]), 200)
            
            ingredient_names =[]
            all_recipes = []
            for ingredient in ingredient_list:
                ingredient_name = list(ingredient.values())[0]
                ingredient_names.append(ingredient_name)

            for ingredient_name in ingredient_names:
                ingredients_nutritions = Nutritions.query.filter(Nutritions.name.in_(ingredient_names)).all()

            ingredients_nutrition_data = []
            for nutrition_info in ingredients_nutritions:
                info_dict = {
                    "ingredient" : nutrition_info.name,
                    "calorie" : nutrition_info.calorie,
                    "fat" : nutrition_info.fats,
                    "carb" :nutrition_info.carbo,
                    "protein": nutrition_info.proteins
                }
                ingredients_nutrition_data.append(info_dict)

            return make_response(jsonify(ingredients_nutrition_data), 200)

        except Exception as e:
            return make_response(jsonify({'message': 'error'}), 500)