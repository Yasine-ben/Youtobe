from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import ForeignKey


class Video(db.Model, UserMixin):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    video = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Float, nullable=False)
    uploader = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationships('User', back_populates='videos')
    comments = db.relationship('Comment', back_populates='videos', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'video': self.video,
            'thumbnail': self.thumbnail,
            'length': self.length,
            'uploader': self.uploader,
            'user_id': self.user_id,
        }