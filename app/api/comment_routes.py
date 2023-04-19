from flask import Blueprint, jsonify, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_required, current_user
from app.models import db, User, Video, Comment
from app.forms import comment_form

comment_routes = Blueprint('comment', __name__)

# UNTESTED
@comment_routes.route('/allComments/<int:video_id>')
def all_comments(video_id):
    """
    Query for all comments belonging to a particular video
    """
    comments = Comment.query.filter_by(comment_id=video_id).all()
    
    if not comments:
        return {'message': 'There are no comments for this video' , 'status': 404}
    
    return { 'comments': [comment.to_dict for comment in comments] }

# UNTESTED
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
    