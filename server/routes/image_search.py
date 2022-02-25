from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import argparse
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from requests import status_codes
from models import db, Recipes, Recipes_Ingredients, Ingredients, Comments, Categories, Users
    
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
        file = request.files['file']
        print("되는지?ㅜㅜ")

        # #*post request에 file이 존재하는지 확인
        # if 'file' not in request.files:
        #     flash('No file part')
        #     return redirect(request.url)
        
        #!파일의 이름을 체크해서 파일 이름이 없으면 업로드가 안된 것으로 판단 => 이게 굳이 필요한지는 잘 모르겠음
        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)
        # try:
        print("되는건지?")
        # request_form = request.form
        # print('request_form: ', request_form)
        # # # print('request_form: ', request_form)
        # # files = request.files.get('file')
        # # print("이거슨:", files)  


        return "다 됐나"
        
        # except Exception as e:
        # return make_response(jsonify({'message': 'error'}), 500)