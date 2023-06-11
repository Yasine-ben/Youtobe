from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .subscriptions import Subscription



class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False) 
    cover_image = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    
    videos = db.relationship("Video", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    
    reactions = db.relationship('Reaction', back_populates='user', cascade='all, delete')
    
    subscriptions = db.relationship('Subscription', foreign_keys=[Subscription.subscriber_id], backref='subscribed_by', lazy='dynamic')
    subscribers = db.relationship('Subscription', foreign_keys=[Subscription.subscribed_to_id], backref='subscribed_to_user', lazy='dynamic')


    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def subscribe(self, user):
        if not self.is_subscribed(user):
            subscription = Subscription(subscriber=self, subscribed_to=user)
            db.session.add(subscription)
            db.session.commit() 

    def unsubscribe(self, user):
        subscription = self.subscriptions.filter_by(subscribed_to=user).first()
        if subscription:
            db.session.delete(subscription)
            db.session.commit()

    def is_subscribed(self, user):
        return self.subscriptions.filter_by(subscribed_to=user).first() is not None

    def get_subscriptions(self):
        return self.subscribed_to.all()

    def get_subscribers(self):
        return self.subscribers.all()

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "cover_image": self.cover_image,
            "reactions": [reaction.reaction_type for reaction in self.reactions],
            "email": self.email,
        }
