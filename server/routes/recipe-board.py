from flask import Blueprint, request, g
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
    

    return 'ok'