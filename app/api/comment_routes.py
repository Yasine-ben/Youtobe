from flask import Blueprint, jsonify, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_required, current_user
from app.models import db, User, Video, Comment
from app.forms import comment_form

comment_routes = Blueprint('comment', __name__)

# # Working
# @comment_routes.route('/allComments/<int:video_id>')
# def all_comments(video_id):
#     """
#     Query for all comments belonging to a particular video
#     """
#     comments = Comment.query.filter_by(video_id=video_id).all()
#     users = User.query.all()
    
#     if not comments:
#         return {'message': 'There are no comments for this video' , 'status': 404}

#     return { 'comments': [comment.to_dict() for comment in comments] }

# WORKING
@comment_routes.route('/allComments/<int:video_id>')
def all_comments(video_id):
    """
    Query for all comments belonging to a particular video,
    and return separate objects for comments and users.
    """
    comments = Comment.query.filter_by(video_id=video_id).all()
    user_ids = [comment.user_id for comment in comments]
    users = User.query.filter(User.id.in_(user_ids)).all()
    
    if not comments:
        return jsonify({'message': 'There are no comments for this video', 'status': 404})
    
    # Convert comments to list of dictionaries
    comments_dict = [comment.to_dict() for comment in comments]
    
    # Convert users to list of dictionaries
    users_dict = [user.to_dict() for user in users]
    
    # Return two separate objects
    return ({'comments': comments_dict, 'users': users_dict})

# WORKING
@comment_routes.route('/createComment/<int:user_id>/<int:video_id>' , methods=['POST'])
def create_comment(video_id,user_id):
    """
    Create Comment
    """
    data = request.get_json()
    comment = Comment(
        comment = data['comment'],
        user_name = data['user_name'],
        user_id = user_id,
        video_id = video_id
    )
    
    db.session.add(comment)
    db.session.commit()
    
    return{ 'comment': comment.to_dict() }

# UNTESTED
@comment_routes.route('/deleteComment/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """
    Delete Comment
    """
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return { 'message': 'Comment Deleted Successfully', 'status': 200 }
    else:
        return { 'error': 'Comment Not Found', 'status': 404 }

# UNTESTED
@comment_routes.route('/updateComment/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    """
    Update Comment
    """
    data = request.get_json()
    comment = Comment.query.get(comment_id)
    if(data and comment):
        comment.comment == data['comment']
        db.session.commit()
        return { 'message': 'Comment Updated Successfully', 'status': 201 }
    else:
        return { 'error': 'Error Updating Comment', 'status': 404 }
    