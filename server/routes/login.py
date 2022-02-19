from flask import Blueprint, jsonify
from flask_restx import Namespace, Resource

login_page = Blueprint('login_page', __name__, url_prefix='/user')
login_page_api = Namespace('login_page_api', path='/user')

@login_page_api.route('/register')
class Register(Resource):
  def get(self):
    return 'blueprint ok'
