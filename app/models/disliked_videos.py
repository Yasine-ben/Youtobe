from .db import db, add_prefix_for_prod, environment, SCHEMA

disliked_videos = db.Table('disliked_videos',
    db.Column('owner_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('video_id', db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), primary_key=True)
)

if environment == "production":
    disliked_videos.schema = SCHEMA