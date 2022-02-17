from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Recipes(db.Model):
  __tablename__ = "Recipes"

  id                                = db.Column(db.Integer, primary_key=True, nullable=False)
  name                              = db.Column(db.String(255), nullable=False)
  method                            = db.Column(db.String(255))
  occation                          = db.Column(db.String(255))
  kind                              = db.Column(db.String(255))
  image                             = db.Column(db.Text, nullable=False)

  def __init__(self, id, name, method, occation, kind, image):
    self.id = id
    self.name = name
    self.method = method
    self.occation = occation
    self.kind = kind
    self.image = image


class Ingredients(db.Model):
  __tablename__ = "Ingredients"

  id                                = db.Column(db.Integer, primary_key=True, nullable=False)
  recipe_id                         = db.Column(db.Integer, db.ForeignKey('Recipes.id'), nullable=False)
  ing                               = db.Column(db.String(255), nullable=False)

  def __init__(self, recipe_id, ing):
    self.recipe_id = recipe_id
    self.ing = ing