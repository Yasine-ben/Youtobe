from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import CheckConstraint, ForeignKey

class Reaction(db.Model):
    __tablename__ = 'reactions'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    video_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    reaction_type = db.Column(db.String(10), nullable=False)
    
    # Add a CheckConstraint to enforce the allowed values
    __table_args__ = (
        CheckConstraint(reaction_type.in_(['like', 'dislike']), name='reaction_type_check'),
    )

    user = db.relationship('User', back_populates='reactions')
    video = db.relationship('Video', back_populates='reactions')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'reaction_type': self.reaction_type,
        }