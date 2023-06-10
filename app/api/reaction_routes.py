from flask import Blueprint, jsonify, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_required, current_user
from app.models import db, User, Video, Reaction , Comment

reaction_routes = Blueprint('reaction', __name__)

@reaction_routes.route('/', methods=['POST'])
@login_required
def create_reaction():
    user_id = request.json.get('user_id')
    video_id = request.json.get('video_id')
    reaction_type = request.json.get('reaction_type')

    user = User.query.get(user_id)
    video = Video.query.get(video_id)

    if not user or not video:
        return jsonify({'message': 'User or video not found'}), 404

    existing_reaction = Reaction.query.filter_by(user=user, video=video).first()
    if existing_reaction:
        return jsonify({'message': 'User already has a reaction to this video'}), 400

    reaction = Reaction(user=user, video=video, reaction_type=reaction_type)
    db.session.add(reaction)
    db.session.commit()

    return jsonify({'message': 'Reaction created successfully'}), 201


#update reaction
@reaction_routes.route('/<int:reaction_id>', methods=['PUT'])
@login_required
def update_reaction(reaction_id):
    reaction = Reaction.query.get(reaction_id)

    if not reaction:
        return jsonify({'message': 'Reaction not found'}), 404

    reaction_type = request.json.get('reaction_type')

    if reaction_type:
        reaction.reaction_type = reaction_type

    db.session.commit()

    return jsonify({'message': 'Reaction updated successfully'})

#delete reaction
@reaction_routes.route('/<int:reaction_id>', methods=['DELETE'])
@login_required
def delete_reaction(reaction_id):
    reaction = Reaction.query.get(reaction_id)

    if not reaction:
        return jsonify({'message': 'Reaction not found'}), 404

    db.session.delete(reaction)
    db.session.commit()

    return jsonify({'message': 'Reaction deleted successfully'})

#get video reactions
@reaction_routes.route('/videos/<int:video_id>')
def get_video_reactions(video_id):
    video = Video.query.get(video_id)

    if not video:
        return jsonify({'message': 'Video not found'}), 404

    reactions = Reaction.query.filter_by(video_id=video_id).all()

    return jsonify({'reactions': [reaction.to_dict() for reaction in reactions]})

# Get all reactions by a user
@reaction_routes.route('/users/<int:user_id>', methods=['GET'])
@login_required
def get_user_reactions(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    reactions = Reaction.query.filter_by(user_id=user_id).all()

    return jsonify({'reactions': [reaction.to_dict() for reaction in reactions]})






# # Get all videos liked by a user
# @reaction_routes.route('/users/<int:user_id>/liked-videos', methods=['GET'])
# @login_required
# def get_user_liked_videos(user_id):
#     user = User.query.get(user_id)

#     if not user:
#         return jsonify({'message': 'User not found'}), 404

#     liked_reactions = Reaction.query.filter_by(user_id=user_id, reaction_type='like').all()
#     liked_video_ids = [reaction.video_id for reaction in liked_reactions]
#     liked_videos = Video.query.filter(Video.id.in_(liked_video_ids)).all()

#     return jsonify({'liked_videos': [video.to_dict() for video in liked_videos]})