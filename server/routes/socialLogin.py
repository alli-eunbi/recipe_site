from flask_restx import Namespace, Resource
import jwt
from models import db, Users
import os
import requests
from flask import Blueprint, redirect, request


# # social 로그인을 진행할 때 social 정보를 가지고 회원가입 및 토큰 발급을 진행하는 함수
def register_and_token(nickname, social_name):
  exe_user = Users.query.filter(Users.nickname==nickname, Users.social==social_name).first()

  # 만약 유저가 존재한다면 바로 jwt토큰 발급한다.
  if exe_user:
    payload = {'id': exe_user.id, 'nickname': exe_user.nickname}
    encoded = jwt.encode(payload, 'secret_key', algorithm="HS256")
    return encoded
  # 유저가 존재하지 않다면 새로 db에 추가하고 jwt토큰을 발급한다.
  else:
    new_user = Users('kakao', 'kakao', nickname)
    new_user.social = social_name
    db.session.add(new_user)
    db.session.commit()
    payload = {'id': new_user.id, 'nickname': new_user.nickname}
    encoded = jwt.encode(payload, 'secret_key', algorithm="HS256")
    return encoded

# 블루프린트 및 네임스페이스 설정
social_login_page = Blueprint('social_login_page', __name__, url_prefix='/user')
social_login_page_api = Namespace('social_login_page_api', path='/user')


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
    print(request)
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

