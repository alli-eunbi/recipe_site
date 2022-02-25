from flask import Blueprint, jsonify, request, g, send_file
from flask_restx import Namespace, Resource, fields
from models import db, Users
import os

recipe_board_page = Blueprint('recipe_board_page', __name__, url_prefix='/recipe-board')
recipe_board_page_api = Namespace('recipe_board_page_api', path='/recipe-board')




@recipe_board_page_api.route('/register')
class Recipe_register(Resource):
  def post(self):
    # 데이터 전달
    request_form = request.form
    print('request_form: ', request_form)

    files = request.files.get('file')
    texts = request_form.get('data')

    full_filename = files.filename
    extension = full_filename.split('.')[-1]
    filename = '20220225'
    save_file_name = f"static/{filename}.{extension}"
    print('file: ', save_file_name)
    print('texts: ', texts)
    # static폴더에 파일 저장
    files.save(save_file_name)
    
    return 'ok'


@recipe_board_page_api.route('/test')
class Test(Resource):
  def get(self):
    data = {"success": True, "url": "localhost:5000/static/20220225.png"}
    
    return jsonify(data)