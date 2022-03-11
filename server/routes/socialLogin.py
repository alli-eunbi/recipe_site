import os
import requests

from flask_restx import Namespace, Resource, fields
import jwt
from models import db, Users
from flask import Blueprint, request, jsonify

# 블루프린트 및 네임스페이스 설정
social_login_page = Blueprint('social_login_page', __name__, url_prefix='/api/user')
social_login_page_api = Namespace('login_page_api', path='/api/user')

# 스웨거에서 사용할 응답 모델 정의
true_response = social_login_page_api.model('Response_true', {
  'success': fields.Boolean(description='성공여부', example=True),
  'message': fields.String(description='결과에 따른 메세지', example='로그인 성공'),
  'jwt': fields.String(description='유저id와 닉네임이 들어간 jwt토큰')
})
false_response = social_login_page_api.model('Response_false', {
  'success': fields.Boolean(description='성공여부', example=False),
  'message': fields.String(description='결과에 따른 메세지'),
})

# # social 로그인을 진행할 때 social 정보를 가지고 회원가입 및 토큰 발급을 진행하는 함수
def register_and_token(nickname, social_name, email=None):
  try:
    exe_user = Users.query.filter(Users.nickname==nickname, Users.social==social_name).first()

    # 만약 유저가 존재한다면 바로 jwt토큰 발급한다.
    if exe_user:
      payload = {'id': exe_user.id, 'nickname': exe_user.nickname}
      encoded = jwt.encode(payload, os.environ['JWT_SECRET_KEY'], algorithm="HS256")
      return encoded
    # 유저가 존재하지 않다면 새로 db에 추가하고 jwt토큰을 발급한다.
    else:
      # 만약 이메일이 없다면 이는 카카오 로그인이므로 social_name을 이메일에 저장한다.
      if email == None:  
        email = social_name
      new_user = Users(email, 'social', nickname)
      new_user.social = social_name
      db.session.add(new_user)
      db.session.commit()
      payload = {'id': new_user.id, 'nickname': new_user.nickname}
      encoded = jwt.encode(payload, os.environ['JWT_SECRET_KEY'], algorithm="HS256")
      return encoded
  except Exception as e:
    return jsonify({'success': False, 'message': '서버 내부 에러'})


# 카카오로그인 콜백 라우터
@social_login_page_api.route('/callback/kakao')
class CallbackKakao(Resource):
  def get(self):
    try:
      # 인가 코드 받기
      code = request.args['code']
      client_id = os.environ['KAKAO_RESTAPI_KEY']
      redirect_uri = os.environ['KAKAO_REDIRECT_URL']
      
      # 토큰 받기
      kakao_oauthurl = 'https://kauth.kakao.com/oauth/token'
      data = {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'code': code,
      }
      token_request = requests.post(kakao_oauthurl, data)
      token_json = token_request.json()
      access_token = token_json['access_token']

      # 토큰을 통해 유저 정보 요청하기
      kakao_info_url = 'https://kapi.kakao.com/v2/user/me'
      request_header = {
        'Authorization': f"Bearer {access_token}"
      }
      info_request = requests.get(kakao_info_url, headers=request_header)
      data = info_request.json()

      nickname = data['properties']['nickname']

      # 닉네임을 가지고 회원가입 및 로그인 진행
      jwt_token = register_and_token(nickname, 'kakao')
      return jsonify({'success': True, 'message': '로그인 성공', 'jwt': jwt_token})
    except Exception as e:
      return jsonify({'success': False, 'message': '서버 내부 에러'})


# 구글로그인 콜백 라우터
@social_login_page_api.route('/callback/google')
class CallbackKakao(Resource):
  def get(self):
    try:
      # 인가 코드 받기
      code = request.args['code']
      
      client_id = os.environ['GOOGLE_CLIENT_ID']
      client_secret = os.environ['GOOGLE_CLIENT_SECRET']
      redirect_uri = os.environ['GOOGLE_RECIRECT_URL']

      # 토큰 받기
      google_oauthurl = 'https://oauth2.googleapis.com/token'
      data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
      }
      token_request = requests.post(google_oauthurl, data)
      token_json = token_request.json()

      # id_token을 통해 유저의 정보를 얻을 수 있다.
      id_token = token_json['id_token']
      id_decoded = jwt.decode(id_token, options={"verify_signature": False})

      email = id_decoded['email']
      nickname = id_decoded['name']

      # 토큰 생성
      jwt_token = register_and_token(nickname, 'google', email)
      return jsonify({'success': True, 'message': '로그인 성공', 'jwt': jwt_token})
    except Exception as e:
      return jsonify({'success': False, 'message': '서버 내부 에러'})