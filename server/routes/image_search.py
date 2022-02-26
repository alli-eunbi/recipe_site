from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import argparse
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Comments, Categories, Users
from ..demo_detector_65.ver2_os_tester

#인공지능 모델 import
import predict_ver2_os as pv2
import cv2


images_search = Blueprint('images_search', __name__, url_prefix='/recipes')
images_search_api = Namespace('search', path='/recipes')

parser = reqparse.RequestParser()
parser.add_argument("ing", type=str)

#?앞으로 할일
#?이미지 받아오기
#?받아온 이미지 모델에 넣기
#?모델에 나온 결과로 검색

@images_search_api.route('/image-search', methods=['POST'])
class image_search(Resource):
    def post(self):
        # try:

        file = request.files['file']
        print("이거슨:", file)

        #*post request에 file이 존재하는지 확인
        if 'file' not in request.files:
            return make_response("사진을 전송하지 않았습니다.", 400)
        
        #!파일의 이름을 체크해서 파일 이름이 없으면 업로드가 안된 것으로 판단 => 이게 굳이 필요한지는 잘 모르겠음
        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)

        # #*전송된 파일을 저장
        # for key, value in file.items():
        #   file = value
        #   print(value)

        full_filename = file.filename
        extension = full_filename.split('.')[-1]

        save_file_name = f"../demo_detector_65/img_test/test.{extension}"
        file.save(save_file_name)

        # 예측할 이미지 파일의 경로
        img_path = './demo_detector_65/img_test/test.jpg'

        # 저장할 json 파일의 경로
        json_path = './demo_detector_65/result/predicted_result.json'

        pv2.img_predictor(img_path, json_path)

        return "다 됐나"
        
        # except Exception as e:
        # return make_response(jsonify({'message': 'error'}), 500)