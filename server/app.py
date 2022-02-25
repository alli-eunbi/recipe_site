from flask import Flask, request, g
from flask_restx import Api, Resource
from models import db
from flask_cors import CORS
from routes.login import login_page, login_page_api
from routes.socialLogin import social_login_page, social_login_page_api
from routes.search import search, recipes_search_api, recipe_board_page, recipe_board_page_api
from routes.recipeDetail import recipe_detail, recipe_detail_api
from dotenv import load_dotenv
import os
import jwt

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@mysql/final_project"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JSON_AS_ASCII'] = False

db.init_app(app)
CORS(app)
app.register_blueprint(login_page)
app.register_blueprint(social_login_page)
app.register_blueprint(recipe_board_page)
app.register_blueprint(search)
app.register_blueprint(recipe_detail)
api = Api(app, version='1.0', title='한컷한상', description='한컷한상 api 명세서')
api.add_namespace(login_page_api)
api.add_namespace(social_login_page_api)
api.add_namespace(recipe_board_page_api)
api.add_namespace(recipes_search_api)
api.add_namespace(recipe_detail_api)

# 요청이 들어올때 로그인된 유저라면 g.current_user에 담아두고 요청 처리 이후 삭제한다.
@app.before_request
def before_request_func():
  authorization = request.cookies.get('accessToken')
  if authorization:
    jwt_token = authorization.split()[1]
    g.current_user = jwt.decode(jwt_token, options={"verify_signature": False})
    print(g.current_user)

# 요청을 처리한 후에는 g 객체에 저장된 유저를 삭제한다.
@app.after_request
def after_request_func(response):
  if 'current_user' in g:
    g.current_user = None
    print('end: ', g.current_user)
  print('g 객체 삭제 완료')
  return response


if __name__ == '__main__':
  app.run(debug=True, port=5000, host='0.0.0.0')