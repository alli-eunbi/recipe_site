from flask import Blueprint, request
import argparse
from flask_restx import Resource, Api, reqparse, Namespace, Resource, fields
from models import db, Users
import sys
print('This is error output', file=sys.stderr)
print('This is standard output', file=sys.stdout)
    
search = Blueprint('recipes', __name__, url_prefix='/recipes')
recipes_search_api = Namespace('recipes_search_api', path='/recipes')

parser = reqparse.RequestParser()
parser.add_argument("ing", type=str, action="split")

@recipes_search_api.route('/word-search', methods=['GET'])
@recipes_search_api.expect(parser)
class word_search(Resource):
    def get(self):
            print("1")
            l = request.args.get('ing')
            print(l)
            return l
