import sys
import os
import cv2
import json

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients

#인공지능 모델 import
from demo_detector_65 import predict_ver2_os as pv2

images_search = Blueprint('/image/search', __name__, url_prefix='/api/ingredients')
images_search_api = Namespace('search', path='/api/ingredients')


@images_search_api.route('/image/search', methods=['POST'])
class image_search(Resource):
    def post(self):
        # try:
            file = request.files['file']

            #*post request에 file이 존재하는지 확인
            if 'file' not in request.files or file.filename == "":
                return make_response("사진을 전송하지 않았습니다.", 400)

            #*파일 저장
            full_filename = file.filename
            extension = full_filename.split('.')[-1]
            img_path = f"/app/demo_detector_65/img_test/test.{extension}"
            file.save(img_path)

            #* 인공지능 모델 검출 결과 저장(json)
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

            print(ingredient_list)

        #     #*이미지 삭제
        #     if os.path.exists(img_path):   
        #         os.remove(img_path)
        
            return make_response(jsonify({"ingredients": ingredient_list}), 200)

        # except Exception as e:
        #     return make_response(jsonify({'message': 'error'}), 500)