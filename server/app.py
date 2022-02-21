from flask import Flask, jsonify
from flask_restx import Api, Resource
from models import db, Recipes
from flask_cors import CORS
from routes.login import login_page, login_page_api
from routes.socialLogin import social_login_page, social_login_page_api
from dotenv import load_dotenv
import os

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

@api.route('/hello')
class Hello(Resource):
  def get(self):
    result = {'sucess': True, 'message': 'hello flask'}
    return result, 200

@api.route('/main')
class Main_test(Resource):
  def get(self):
    return ['main test']


# @api.route('/main/<id>')
# def main(id):
#   test = Recipes(id, 'test', '볶음', '안주', '종류', 'test이미지')
#   db.session.add(test)
#   db.session.commit()
#   return 'test Recipes db'

# @api.route('/check')
# def test():
#   recipes = Recipes.query.all()
#   response = []

#   for recipe in recipes:
#     response.append(recipe.name)


#   return jsonify(response)


if __name__ == '__main__':
  app.run(debug=True, port=5000, host='0.0.0.0')