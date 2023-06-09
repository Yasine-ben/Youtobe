import random
import requests
from moviepy.editor import VideoFileClip
import os
from flask import Blueprint, jsonify, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_required, current_user
from app.models import db, User, Video, Comment, Reaction
from app.forms import VideoForm
from .AWS_helpers import get_unique_filename, upload_file_to_AWS



video_routes = Blueprint('video', __name__)

# WORKING
@video_routes.route('/allVideos')
def allVideos():
    """
    Query for all videos
    """
    videos = Video.query.all()
    return { 'videos': [video.to_dict() for video in videos] }


@video_routes.route('/subscribedVideos')
@login_required
def get_subscribed_videos():
    subscribed_users = [subscription.subscribed_to_id for subscription in current_user.get_subscriptions()]
    subscribed_videos = Video.query.filter(Video.user_id.in_(subscribed_users)).order_by(Video.created_at.desc()).all()
    # print('///////////////////////////////////////////////')
    # for video in subscribed_videos:
    #     print('/////////////////////////////////')
    #     print(video.created_at)
    # print(subscribed_videos[0].created_at)
    return { 'videos': [video.to_dict() for video in subscribed_videos] }


@video_routes.route('/addView/<int:video_id>')
def addView(video_id):
    if video_id:
        video = Video.query.get(video_id)
        if(video):
            video.views += 1
            db.session.commit()
            return jsonify({"message": "Video views successfully updated"}), 201
        else:
            return jsonify({"message": "Video does not exist"}), 404
    else:
        return jsonify({"message": "Error with video_id provided"}), 403

@video_routes.route('/userVideos/<int:user_id>')
@login_required
def userVideos(user_id):
    '''
    Query for all of the current users videos
    '''
    user = User.query.get(user_id)
    if not user:
        return{'error': 'User not found'}
    
    videos = Video.query.filter_by(user_id=user_id).all()
    
    return {'videos': [video.to_dict() for video in videos]}

@video_routes.route('/<int:video_id>')
def singleVideo(video_id):
    """
    Query for single video using video_id passed in
    """
    video = Video.query.get(video_id)
    if not video:
        return {'error': 'Video not found', 'status': 404}

    # Get the video reactions
    reactions = Reaction.query.filter_by(video_id=video.id).all()

    # Convert reactions to a list of dictionaries
    reactions_data = [reaction.to_dict() for reaction in reactions]

    # Get the video subscribers
    subscribers = [subscriber.to_dict() for subscriber in video.user.get_subscribers()]

    # Add reactions and subscribers to the video dictionary
    video_data = video.to_dict()
    video_data['reactions'] = reactions_data
    video_data['subscribers'] = subscribers

    return {'video': video_data}

@video_routes.route('/createVideo', methods=['POST'])
@login_required
def createVideo():
    """
    Create video
    """
    data = request.files
    dataStrings = request.form
    user = current_user
        
    form = VideoForm(
        title=dataStrings['title'],
        description=dataStrings['description'],
        video=data.get('video'),
        thumbnail=data.get('thumbnail'),
        uploader=dataStrings['uploader'],
        user_id=user.id,
        csrf_token=generate_csrf()
        )
        
    if form.validate_on_submit():
        video = form.data['video']
        thumbnail = form.data['thumbnail']

        video.filename = get_unique_filename(video.filename)
        thumbnail.filename = get_unique_filename(thumbnail.filename)

        # upload video/thumbnail to AWS
        uploadVideo = upload_file_to_AWS(video)
        uploadThumbnail = upload_file_to_AWS(thumbnail)
        
        # if video/thumbnail upload failed return error message
        if "url" not in uploadVideo and uploadThumbnail:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return jsonify({"error": "Error uploading file to AWS"}), 500
        
        videoURL = uploadVideo["url"]
        thumbnailURL = uploadThumbnail["url"]
        
        # Retrieve the file contents from the URL using requests.get()
        response = requests.get(videoURL)

        # Save the video file locally
        video_filepath = "video_file.mp4"
        with open(video_filepath, "wb") as file:
            file.write(response.content)

        # Load the video file using VideoFileClip()
        video = VideoFileClip(video_filepath)

        # Get the video duration in seconds
        duration = video.duration

        # Cleanup: delete the temporary video file
        os.remove(video_filepath)
        
        new_video = Video(
            title=form.data['title'],
            description=form.data['description'],
            video=videoURL,
            length=duration,
            cover_image=user.cover_image,
            thumbnail=thumbnailURL,
            uploader=form.data['uploader'],
            user_id=user.id,
        )
        db.session.add(new_video)
        db.session.commit()
        return jsonify({"message": "Successfully Uploaded Video"}), 201
    
    if form.errors:
        print(form.errors)
        return jsonify({"error": "Invalid Data"}), 403
    
    else:
        return jsonify({"error": "Form Validation Error"}), 500
    

# WORKING    
@video_routes.route('/updateVideo/<int:video_id>', methods=['PUT'])
def updateVideo(video_id):
    """
    Update Video
    """
    video = Video.query.get(video_id)
    data = request.get_json()
    
    if (video and data):
        video.title = data['title']
        video.description = data['description']
        video.thumbnail = data['thumbnail']
        db.session.commit()
        return { 'message': 'Video updated successfully', 'status': 200 }
    else:
        return { 'error': 'Video not found or no data sent', 'status' : 404 }

# WORKING    
@video_routes.route('/deleteVideo/<int:video_id>', methods=['DELETE'])
def deleteVideo(video_id):
    """
    Delete Video
    """
    video = Video.query.get(video_id)
    if(video):
        db.session.delete(video)
        db.session.commit()
        return { 'message' : 'Video Deleted Successfully' }
    else:
        return { 'error' : 'Video Not Found', 'status' : 404}