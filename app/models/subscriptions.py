from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey

class Subscription(db.Model):
    __tablename__ = 'subscriptions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    subscriber_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    subscribed_to_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    subscriber = db.relationship('User', foreign_keys=[subscriber_id])
    subscribed_to = db.relationship('User', foreign_keys=[subscribed_to_id])

    def __init__(self, subscriber_id, subscribed_to_id):
        if subscriber_id == subscribed_to_id:
            raise ValueError("Cannot subscribe to oneself.")
        self.subscriber_id = subscriber_id
        self.subscribed_to_id = subscribed_to_id
    
    def to_dict(self):
        return {
            "id": self.id,
            "subscriber_id": self.subscriber_id,
            "subscribed_to_id": self.subscribed_to_id
        }