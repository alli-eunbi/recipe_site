from flask import Flask, request, g
from flask_restx import Api, Resource
from models import db
from flask_cors import CORS
from routes.login import login_page, login_page_api
from routes.socialLogin import social_login_page, social_login_page_api
from dotenv import load_dotenv
import os
import jwt

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@mysql/final_project"


db.init_app(app)
CORS(app)
app.register_blueprint(login_page)
app.register_blueprint(social_login_page)
api = Api(app, version='1.0', title='한컷한상', description='한컷한상 api 명세서')
api.add_namespace(login_page_api)
api.add_namespace(social_login_page_api)


# 요청이 들어올때 로그인된 유저라면 g.current_user에 담아두고 요청 처리 이후 삭제한다.
@app.before_request
def before_request_func():
  authorization = request.cookies.get('accessToken')
  if authorization:
    jwt_token = authorization.split()[1]
    g.current_user = jwt.decode(jwt_token, options={"verify_signature": False})
    print(g.current_user)

@app.after_request
def after_request_func(response):
  if 'current_user' in g:
    g.current_user = None
    print('end: ', g.current_user)
  print('g 객체 삭제 완료')
  return response


@api.route('/hello')
class Hello(Resource):
  def get(self):
    result = {'sucess': True, 'message': 'hello flask'}
    return result, 200

@api.route('/main')
class Main_test(Resource):
  def get(self):
    return ['main test']


if __name__ == '__main__':
  app.run(debug=True, port=5000, host='0.0.0.0')