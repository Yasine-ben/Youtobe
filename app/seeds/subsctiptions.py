from app.models import db, Subscription, environment, SCHEMA
from sqlalchemy.sql import text


# Create seeders for subscriptions between users up to ID 5
def seed_subscriptions():
    # Subscription: Demo -> Drake
    subscription1 = Subscription(subscriber_id=1, subscribed_to_id=2)
    # Subscription: Demo -> Marnie
    subscription2 = Subscription(subscriber_id=1, subscribed_to_id=3)
    # Subscription: Drake -> Demo
    subscription3 = Subscription(subscriber_id=2, subscribed_to_id=1)
    # Subscription: Drake -> Marnie
    subscription4 = Subscription(subscriber_id=2, subscribed_to_id=3)
    # Subscription: Marnie -> Demo
    subscription5 = Subscription(subscriber_id=3, subscribed_to_id=1)
    # Subscription: Marnie -> Drake
    subscription6 = Subscription(subscriber_id=3, subscribed_to_id=2)
    # Subscription: Marnie -> Bobbie
    subscription7 = Subscription(subscriber_id=3, subscribed_to_id=4)
    # Subscription: Bobbie -> Demo
    subscription8 = Subscription(subscriber_id=4, subscribed_to_id=1)
    # Subscription: Bobbie -> Drake
    subscription9 = Subscription(subscriber_id=4, subscribed_to_id=2)
    # Subscription: Gobbie -> Demo
    subscription10 = Subscription(subscriber_id=5, subscribed_to_id=1)

    db.session.add_all([
        subscription1,
        subscription2,
        subscription3,
        subscription4,
        subscription5,
        subscription6,
        subscription7,
        subscription8,
        subscription9,
        subscription10,
    ])
    db.session.commit()

# Undo the seeders for subscriptions
def undo_subscriptions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.subscriptions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM subscriptions"))

    db.session.commit()
