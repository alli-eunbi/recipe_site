import jwt
import bcrypt
import os

from flask import Blueprint, request, jsonify
from flask_restx import Namespace, Resource, fields
from models import db, Users

login_page = Blueprint('login_page', __name__, url_prefix='/api/user')
login_page_api = Namespace('login_page_api', path='/api/user')

# 스웨거에서 사용할 body로 받을 모델들 정의
register = login_page_api.model('Register', {
  'email': fields.String,
  'nickname': fields.String,
  'password1': fields.String,
  'password2': fields.String
})
login = login_page_api.model('Local_Login', {
  'email': fields.String,
  'password': fields.String
})
# 스웨거에서 사용할 응답 모델 정의
true_response = login_page_api.model('Response_true', {
  'success': fields.Boolean(description='성공여부', example=True),
  'message': fields.String(description='결과에 따른 메세지', example='로그인 성공'),
  'jwt': fields.String(description='유저id와 닉네임이 들어간 jwt토큰')
})
false_response = login_page_api.model('Response_false', {
  'success': fields.Boolean(description='성공여부', example=False),
  'message': fields.String(description='결과에 따른 메세지'),
})

# 닉네임 체크 라우터
@login_page_api.route('/check')
class Check(Resource):
  def get(self):
    try:
      nickname = request.args.get('nickname')
      exe_user = Users.query.filter(Users.nickname==nickname).first()
      if exe_user:
        return jsonify({'success': False, 'message': '이미 존재하는 닉네임입니다.'})
      return jsonify({'success': True, 'message': '사용 가능한 닉네임입니다.'})
    except Exception as e:
      return jsonify({'success': False, 'message': '서버 내부 에러'})


# 회원가입 라우터
@login_page_api.route('/register')
class Register(Resource):  
  @login_page_api.doc(body=register)
  @login_page_api.response(200, 'success', true_response)
  @login_page_api.response(400, 'fail', false_response)
  def post(self):
    try:
      request_body = request.get_json()
      email = request_body['email']
      nickname = request_body['nickname']
      password = request_body['password1']

      exe_user = Users.query.filter(Users.email==email).first()
      # 이미 존재하는 이메일이라면
      if exe_user:
        return jsonify({'success': False, 'message': '이미 존재하는 이메일입니다.'})
      
      # 비밀번호 암호화
      hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

      # 아이디 저장
      newUser = Users(email, hashed, nickname)
      db.session.add(newUser)
      db.session.commit()

      return jsonify({'success': True, 'message': '회원가입 성공'})
    except Exception as e:
      return jsonify({'success': False, 'message': '서버 내부 에러'})


# 로그인 라우터
@login_page_api.route('/login')
class Login(Resource):
  @login_page_api.doc(body=login)
  @login_page_api.response(200, 'success', true_response)
  @login_page_api.response(400, 'fail', false_response)
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
          encoded = jwt.encode(payload, os.environ['JWT_SECRET_KEY'], algorithm="HS256")
          return jsonify({'success': True, 'message': '로그인 성공', 'jwt': encoded})
        else:
          return jsonify({'success': False, 'message': '비밀번호가 틀립니다.'})
      
      return jsonify({'success': False, 'message': '존재하지 않는 이메일입니다.'})
    except Exception as e:
      return jsonify({'success': False, 'message': '서버 내부 에러'})