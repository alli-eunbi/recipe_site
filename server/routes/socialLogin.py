from flask_restx import Namespace, Resource
import jwt
from models import db, Users
import os
import requests
from flask import Blueprint, redirect, request

# 블루프린트 및 네임스페이스 설정
social_login_page = Blueprint('social_login_page', __name__, url_prefix='/user')
social_login_page_api = Namespace('login_page_api', path='/user')

# # social 로그인을 진행할 때 social 정보를 가지고 회원가입 및 토큰 발급을 진행하는 함수
def register_and_token(nickname, social_name, email=None):
  exe_user = Users.query.filter(Users.nickname==nickname, Users.social==social_name).first()

  # 만약 유저가 존재한다면 바로 jwt토큰 발급한다.
  if exe_user:
    payload = {'id': exe_user.id, 'nickname': exe_user.nickname}
    encoded = jwt.encode(payload, 'secret_key', algorithm="HS256")
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
    encoded = jwt.encode(payload, 'secret_key', algorithm="HS256")
    return encoded


# 카카오로그인 라우터
@social_login_page_api.route('/login/kakao')
class LoginKakao(Resource):
  def get(self):
    # print(request)
    client_id = os.environ['KAKAO_RESTAPI_KEY']
    redirect_uri = 'http://localhost:5000/user/callback/kakao'
    kakao_uri = f"https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"

    return redirect(kakao_uri)

# 카카오로그인 콜백 라우터
@social_login_page_api.route('/callback/kakao')
class CallbackKakao(Resource):
  def get(self):
    # 인가 코드 받기
    code = request.args['code']
    client_id = os.environ['KAKAO_RESTAPI_KEY']
    redirect_uri = 'http://localhost:5000/user/callback/kakao'

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
    return {'success': True, 'message': '로그인 성공', 'jwt': jwt_token}


# 구글로그인 라우터
@social_login_page_api.route('/login/google')
class LoginGoogle(Resource):
  def get(self):
    # print(request)
    client_id = os.environ['GOOGLE_CLIENT_ID']
    redirect_uri = 'http://localhost:5000/user/callback/google'
    scope = 'openid%20profile%20email'
    google_uri = f"https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&response_type=code"

    return redirect(google_uri)

# 구글로그인 콜백 라우터
@social_login_page_api.route('/callback/google')
class CallbackKakao(Resource):
  def get(self):
    # 인가 코드 받기
    code = request.args['code']
    
    client_id = os.environ['GOOGLE_CLIENT_ID']
    client_secret = os.environ['GOOGLE_CLIENT_SECRET']
    redirect_uri = 'http://localhost:5000/user/callback/google'

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
    return {'success': True, 'message': '로그인 성공', 'jwt': jwt_token}