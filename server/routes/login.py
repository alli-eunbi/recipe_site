from flask import Blueprint, jsonify, request
from flask_restx import Namespace, Resource, fields
import jwt
from models import db, Users
import bcrypt

login_page = Blueprint('login_page', __name__, url_prefix='/user')
login_page_api = Namespace('login_page_api', path='/user')

# body로 받을 모델들 정의
resource_fields = login_page_api.model('Resource', {
  'email': fields.String,
  'nickname': fields.String,
  'password1': fields.String,
  'password2': fields.String
})

# 회원가입 라우터
@login_page_api.route('/register')
class Register(Resource):  
  @login_page_api.doc(body=resource_fields)
  def post(self):
    try:
      request_body = request.get_json()
      email = request_body['email']
      nickname = request_body['nickname']
      password = request_body['password1']

      print(email, nickname, password)
      exe_user = Users.query.filter(Users.email==email).first()
      print(exe_user)
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

    
