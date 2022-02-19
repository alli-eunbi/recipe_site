from email.policy import default
from json.tool import main
from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class Recipes(db.Model):
  __tablename__ = "Recipes"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id                           = db.Column(db.Integer, db.ForeignKey('Users.id'))
  name                              = db.Column(db.String(255), nullable=False)
  method                            = db.Column(db.String(255))
  occation                          = db.Column(db.String(255))
  kind                              = db.Column(db.String(255))
  main_image                        = db.Column(db.Text, nullable=False)
  cooking_step                      = db.Column(db.Text)
  cooking_image                     = db.Column(db.Text)
  serving                           = db.Column(db.Integer)
  time                              = db.Column(db.String(255))
  total_ingredients                 = db.Column(db.Text)
  mean_rating                       = db.Column(db.Float, default=0)
  created_at                        = db.Column(db.Date, default=date.today())

  def __init__(self, user_id, name, method, occation, kind, main_image, cooking_step, cooking_image, serving, time, total_ingredients):
    self.user_id = user_id
    self.name = name
    self.method = method
    self.occation = occation
    self.kind = kind
    self.main_image = main_image
    self.cooking_step = cooking_step
    self.cooking_image = cooking_image
    self.serving = serving
    self.time = time
    self.total_ingredients = total_ingredients


class Ingredients(db.Model):
  __tablename__ = "Ingredients"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'), nullable=False)
  ingredients_id                    = db.Column(db.Integer, db.ForeignKey('Ingredients_index.id') ,nullable=False)

  def __init__(self, recipe_id, ingredients_id):
    self.recipe_id = recipe_id
    self.ingredients_id = ingredients_id


class Ingredients_index(db.Model):
  __tablename__ = "Ingredients_index"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(255), unique=True)

  def __init__(self, name):
    self.name = name


class Comments(db.Model):
  __tablename__ = "Comments"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'))
  user_id                           = db.Column(db.Integer, db.ForeignKey('Users.id'))
  comment                           = db.Column(db.Text)
  rating                            = db.Column(db.Integer, default=0)
  created_at                        = db.Column(db.Date, default=date.today())

  def __init__(self, recipe_id, user_id, commnet, rating):
    self.recipe_id = recipe_id
    self.user_id = user_id
    self.comment = commnet
    self.rating = rating


class Recomments(db.Model):
  __tablename__ = "Recomments"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  comment_id                        = db.Column(db.Integer, db.ForeignKey('Comments.id'))
  comment                           = db.Column(db.Text)
  user_id                           = db.Column(db.Integer, db.ForeignKey('Users.id'))
  created_at                        = db.Column(db.Date, default=date.today())

  def __init__(self, comment_id, comment, user_id):
    self.comment_id = comment_id
    self.comment = comment
    self.user_id = user_id


class Likes(db.Model):
  __tablename__ = "Likes"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id                           = db.Column(db.Integer, db.ForeignKey('Users.id'))
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'))

  def __init__(self, user_id, recipe_id):
    self.user_id = user_id
    self.recipe_id = recipe_id


class Users(db.Model):
  __tablename__ = "Users"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  email                             = db.Column(db.String(255))
  password                          = db.Column(db.Text)
  nickname                          = db.Column(db.String(255))
  social                            = db.Column(db.String(255), default='local')

  def __init__(self, email, password, nickname):
    self.email = email
    self.password = password
    self.nickname = nickname

