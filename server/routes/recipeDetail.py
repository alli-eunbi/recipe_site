import ast

from flask import Blueprint, jsonify, make_response, g
from flask_restx import Namespace, Resource, fields
from models import *

recipe_detail = Blueprint('recipe_detail', __name__, url_prefix='/api/recipes')
recipe_detail_api = Namespace('recipe_detail_api', path='/api/recipes')

# 상세페이지 라우터
@recipe_detail_api.route('/<int:recipe_id>')
class ShowDetail(Resource):
    def get(self, recipe_id):
        try:
            recipe = Recipes.query.filter(Recipes.id==recipe_id).first()
            if not recipe:
                return make_response(jsonify({'message': 'no recipe'}), 404)
            recipe_name = recipe.name
            user_id = recipe.user_id # recipe 작성자
            user = Users.query.filter(Users.id==user_id).first()
            user_nickname = user.nickname # recipe 작성자의 닉네임
            main_image = recipe.main_image
            cooking_step = ast.literal_eval(recipe.cooking_step)
            cooking_image = ast.literal_eval(recipe.cooking_image)
            serving = recipe.serving
            time = recipe.time
            total_ingredients = recipe.total_ingredients
            mean_rating = recipe.mean_rating
            created_at = str(recipe.created_at)

            if 'current_user' in g:
                login_user_id, login_user_nickname = g.current_user.get('id'), g.current_user.get('nickname')
                if Likes.query.filter(Likes.user_id==login_user_id, Likes.recipe_id==recipe_id).first():
                    like = True
                else:
                    like = False
            else:
                like = False

            categories = Categories.query.filter(Categories.recipe_id==recipe_id).all()
            for cate in categories:
                if cate.type == 'method':
                    method = cate.name
                elif cate.type == 'occation':
                    occation = cate.name
                elif cate.type == 'kind':
                    kind = cate.name

            comments = Comments.query.filter(Comments.recipe_id==recipe_id).all()
            comments_list = [] # comments 전체 리스트
            for comment in comments:
                com_dict = {} # comments 리스트 안의 dict
                recom_dict = {} # com_dict 안의 recomment dict
                recom_list = [] # recom_dict을 감싸는 list -> com_dict 안의 recomment 키의 value
                if comment.parent_id == 0:
                    # 댓글
                    com_dict['comment_id'] = comment.id
                    com_dict['user_id'] = comment.user_id
                    user = Users.query.filter(Users.id==user_id).first()
                    com_dict['nickname'] = user.nickname
                    com_dict['comment'] = comment.comment
                    com_dict['rating'] = comment.rating
                    com_dict['created_at'] = comment.created_at
                    # 대댓글
                    recomment = Comments.query.filter(Comments.recipe_id==recipe_id, Comments.parent_id==comment.id).first()
                    if recomment:
                        recom_dict['recomment_id'] = recomment.id
                        recom_user = Users.query.filter(Users.id==recomment.user_id).first()
                        recom_dict['nickname'] = recom_user.nickname
                        recom_dict['comment'] = recomment.comment
                        recom_dict['created_at'] = recomment.created_at
                        recom_list.append(recom_dict)
                        com_dict['recomment'] = recom_list
                    comments_list.append(com_dict)
            

            return make_response(jsonify({
                'recipe_id': recipe_id,
                'recipe_name': recipe_name,
                'user_id': user_id,
                'user_nickname': user_nickname,
                'main_image': main_image,
                'cooking_step': cooking_step,
                'cooking_image': cooking_image,
                'serving': serving,
                'time': time,
                'total_ingredients': total_ingredients,
                'mean_rating': mean_rating,
                'created_at': created_at,
                'like': like,
                'method': method,
                'occation': occation,
                'kind': kind,
                'comments': comments_list
            }), 200)
        except Exception as e:
            return make_response(jsonify({'message': 'error'}), 500)      