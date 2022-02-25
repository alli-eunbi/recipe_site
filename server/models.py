from unicodedata import name
from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class Recipes(db.Model):
  __tablename__ = "Recipes"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id                           = db.Column(db.Integer, db.ForeignKey('Users.id'))
  name                              = db.Column(db.String(255), nullable=False)
  main_image                        = db.Column(db.Text, nullable=False)
  cooking_step                      = db.Column(db.Text)
  cooking_image                     = db.Column(db.Text)
  serving                           = db.Column(db.String(255))
  time                              = db.Column(db.String(255))
  total_ingredients                 = db.Column(db.Text)
  mean_rating                       = db.Column(db.Float, default=0)
  created_at                        = db.Column(db.Date, default=date.today())

  def __init__(self, user_id, name, main_image, cooking_step, cooking_image, serving, time, total_ingredients):
    self.user_id = user_id
    self.name = name
    self.main_image = main_image
    self.cooking_step = cooking_step
    self.cooking_image = cooking_image
    self.serving = serving
    self.time = time
    self.total_ingredients = total_ingredients


class Categories(db.Model):
  __tablename__ = "Categories"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'))
  name                              = db.Column(db.String(255))
  type                              = db.Column(db.String(255))


class Recipes_Ingredients(db.Model):
  __tablename__ = "Recipes_Ingredients"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'), nullable=False)
  ingredients_id                    = db.Column(db.Integer, db.ForeignKey('Ingredients.id') ,nullable=False)

  def __init__(self, recipe_id, ingredients_id):
    self.recipe_id = recipe_id
    self.ingredients_id = ingredients_id


class Ingredients(db.Model):
  __tablename__ = "Ingredients"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(255), unique=True)

  def __init__(self, name):
    self.name = name


class Comments(db.Model):
  __tablename__ = "Comments"

  id                                = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'))
  user_id                           = db.Column(db.Integer, db.ForeignKey('Users.id'))
  parent_id                         = db.Column(db.Integer, default=0)
  comment                           = db.Column(db.Text)
  rating                            = db.Column(db.Integer, default=0)
  created_at                        = db.Column(db.Date, default=date.today())

  def __init__(self, recipe_id, user_id, parent_id, commnet, rating):
    self.recipe_id = recipe_id
    self.user_id = user_id
    self.parent_id = parent_id
    self.comment = commnet
    self.rating = rating


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

