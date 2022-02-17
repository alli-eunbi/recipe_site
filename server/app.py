from flask import Flask
from models import db, Recipes
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:password@mysql/final_project"

db.init_app(app)
Migrate().init_app(app, db)
CORS(app)

@app.route('/')
def hello():
    return 'Hello, flask!'

@app.route('/main')
def main_test():
  return 'main test'

@app.route('/main/<id>')
def main(id):
  test = Recipes(id, 'test', '볶음', '안주', '종류', 'test이미지')
  db.session.add(test)
  db.session.commit()
  return 'test Recipes db'

# @app.route('/check')

#   return {success: True, data: '찾은 데이터'}


if __name__ == '__main__':
  app.run(debug=True, port=5000, host='0.0.0.0')