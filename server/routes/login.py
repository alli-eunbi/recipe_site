from flask import Blueprint, redirect, request
from flask_restx import Namespace, Resource, fields
import jwt
from models import db, Users
import bcrypt

login_page = Blueprint('login_page', __name__, url_prefix='/user')
login_page_api = Namespace('login_page_api', path='/user')

# body로 받을 모델들 정의
register = login_page_api.model('Resource1', {
  'email': fields.String,
  'nickname': fields.String,
  'password1': fields.String,
  'password2': fields.String
})
login = login_page_api.model('Resource2', {
  'email': fields.String,
  'password': fields.String
})


# 회원가입 라우터
@login_page_api.route('/register')
class Register(Resource):  
  @login_page_api.doc(body=register)
  def post(self):
    try:
      request_body = request.get_json()
      email = request_body['email']
      nickname = request_body['nickname']
      password = request_body['password1']

      exe_user = Users.query.filter(Users.email==email).first()
      # 이미 존재하는 이메일이라면
      if exe_user:
        return {'success': False, 'message': '이미 존재하는 이메일입니다.'}
      
      # 이미 존재하는 닉네임이라면
      exe_user = Users.query.filter(Users.nickname==nickname).first()
      if exe_user:
        return {'success': False, 'message': '이미 존재하는 닉네임입니다.'}
      
      # 비밀번호 암호화
      hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

      # 아이디 저장
      newUser = Users(email, hashed, nickname)
      db.session.add(newUser)
      db.session.commit()

      # jwt토큰 응답하기
      payload = {'id': newUser.id, 'nickname': newUser.nickname}
      encoded = jwt.encode(payload, 'secret_key', algorithm="HS256")
      return {'success': True, 'message': '회원가입 성공', 'jwt': encoded}
    except Exception as e:
      print(e)
      return {'success': False, 'message': '서버 내부 에러'}, 500


# 로그인 라우터
@login_page_api.route('/login')
class Login(Resource):
  @login_page_api.doc(body=login)
  def post(self):
    try:
      request_body = request.get_json()
      email = request_body['email']
      password = request_body['password']

      exe_user = Users.query.filter(Users.email==email).first()
      # 아이디가 존재하는 경우
      if exe_user:
        # 비밀번호가 일치하는 경우 jwt토큰을 전달한다.
        if bcrypt.checkpw(password.encode('utf-8'), exe_user.password.encode('utf-8')):
          payload = {'id': exe_user.id, 'nickname': exe_user.nickname}
          encoded = jwt.encode(payload, 'secret_key', algorithm="HS256")
          return {'success': True, 'message': '로그인 성공', 'jwt': encoded}
        else:
          return {'success': False, 'message': '비밀번호가 틀립니다.'}
      
      return {'success': False, 'message': '존재하지 않는 이메일입니다.'}
    except Exception as e:
      print('error:', e)
      return {'success': False, 'message': '서버 내부 에러'}, 500
