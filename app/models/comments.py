from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import ForeignKey
from datetime import datetime

class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    user_name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id'))) # maybe add on delete cascade
    video_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('videos.id'), ondelete='CASCADE'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = db.relationship('User', back_populates='comments')
    videos = db.relationship('Video', back_populates='comments')
    
    def to_dict(self):
        return{
            'id': self.id,
            'comment': self.comment,
            'user_name': self.user_name,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }