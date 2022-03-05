from operator import and_
import sys
import os
import cv2
import json

from flask import Blueprint, make_response, session, request, jsonify
from flask_sqlalchemy import *
import argparse 
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from numpy import append
from requests import status_codes
from models import db, Recipes, RecipesIngredients, Ingredients, Comments, Categories, Users


images_additional_search = Blueprint('/image/additional-search', __name__, url_prefix='/api/recipes')
images_additional_search_api = Namespace('search', path='/api/recipes')

#* word_search처럼 문자열 말고 빈 배열로 전달
@images_additional_search_api.route('/image/additional-search', methods=['GET'])
class image_search(Resource):
    def get(self):
        # try:
        ing_query= request.args.get('ing')
        ingredient_query_list = ing_query.split(" ")
        print(ingredient_query_list)

        if ingredient_query_list[0] == '' or ing_query is None:
                return make_response("찾으실 재료를 입력해주세요.", 400)

        # 재료 id 불러오기(_in사용하기, like 사용하지 않고 변경하기)
        ingredients_list = Ingredients.query.filter(Ingredients.name.in_(ingredient_query_list)).all()
        print(ingredients_list)