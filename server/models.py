from unicodedata import name
from flask_sqlalchemy import SQLAlchemy, SignallingSession
from datetime import date

db = SQLAlchemy()
# db.create_scoped_session()

class Recipes(db.Model):
  __tablename__ = "Recipes"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
  name = db.Column(db.String(255), nullable=False)
  main_image = db.Column(db.Text, nullable=False)
  cooking_step = db.Column(db.Text)
  cooking_image = db.Column(db.Text)
  serving = db.Column(db.String(255))
  time = db.Column(db.String(255))
  total_ingredients = db.Column(db.Text)
  created_at = db.Column(db.Date, default=date.today())

  categories = db.relationship('Categories', backref="Recipes")
  users = db.relationship('Users', backref="Recipes")
  recipes_ingredients = db.relationship('RecipesIngredients', backref="Recipes")

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

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id = db.Column(db.Integer, db.ForeignKey('Recipes.id'))
  name = db.Column(db.String(255))
  type = db.Column(db.String(255))

  def __init__(self, recipe_id, name, type):
    self.recipe_id = recipe_id
    self.name = name
    self.type = type


class RecipesIngredients(db.Model):
  __tablename__ = "Recipes_Ingredients"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  recipe_id = db.Column(db.Integer, db.ForeignKey('Recipes.id'), nullable=False)
  ingredients_id = db.Column(db.Integer, db.ForeignKey('Ingredients.id') ,nullable=False)

  recipes = db.relationship('Recipes', backref="RecipesIngredients")
  ingredients = db.relationship('Ingredients', backref="RecipesIngredients")


  def __init__(self, recipe_id, ingredients_id):
    self.recipe_id = recipe_id
    self.ingredients_id = ingredients_id


class Ingredients(db.Model):
  __tablename__ = "Ingredients"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(255), unique=True)
  type = db.Column(db.Integer)

  def __init__(self, name, type):
    self.name = name
    self.type = type


class Users(db.Model):
  __tablename__ = "Users"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  email = db.Column(db.String(255))
  password = db.Column(db.Text)
  nickname = db.Column(db.String(255))
  social = db.Column(db.String(255), default='local')

  def __init__(self, email, password, nickname):
    self.email = email
    self.password = password
    self.nickname = nickname


class Nutritions(db.Model):
  __tablename__ = "Nutritions"

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(255))
  calorie = db.Column(db.Integer)
  fats = db.Column(db.Integer)
  carbo = db.Column(db.Integer)
  proteins = db.Column(db.Integer)
