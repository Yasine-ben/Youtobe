from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Subscription, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    subscribers = [subscriber.to_dict() for subscriber in user.get_subscribers()]
    subscriptions = [subscription.to_dict() for subscription in user.get_subscriptions()]
    user_data = user.to_dict()
    user_data['subscribers'] = subscribers
    user_data['subscriptions'] = subscriptions
    return user_data

@user_routes.route('/subscribe', methods=['POST'])
@login_required
def subscribe():
    data = request.json
    subscriber_id = data['subscriber_id']
    subscribed_to_id = data['subscribed_to_id']

    if subscriber_id == subscribed_to_id:
        return jsonify(message='Cannot subscribe to your own channel.')

    # Check if the subscription already exists
    existing_subscription = Subscription.query.filter_by(
        subscriber_id=subscriber_id,
        subscribed_to_id=subscribed_to_id
    ).first()

    if existing_subscription:
        return jsonify(message='Already subscribed.')

    try:
        subscription = Subscription(subscriber_id=subscriber_id, subscribed_to_id=subscribed_to_id)
        db.session.add(subscription)
        db.session.commit()
        return jsonify(message='Subscribed successfully.')
    except Exception as e:
        return jsonify(message='Failed to subscribe.', error=str(e))
    
@user_routes.route('/subscribe', methods=['DELETE'])
@login_required
def unsubscribe():
    data = request.json
    subscriber_id = data['subscriber_id']
    subscribed_to_id = data['subscribed_to_id']

    # Check if the subscription exists
    subscription = Subscription.query.filter_by(
        subscriber_id=subscriber_id,
        subscribed_to_id=subscribed_to_id
    ).first()

    if not subscription:
        return jsonify(message='Subscription does not exist.')

    try:
        db.session.delete(subscription)
        db.session.commit()
        return jsonify(message='Unsubscribed successfully.')
    except Exception as e:
        return jsonify(message='Failed to unsubscribe.', error=str(e))
    
