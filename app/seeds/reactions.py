from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reactions():
    # Create reactions
    reaction1 = Reaction(user_id=1, video_id=1, reaction_type="like")
    reaction2 = Reaction(user_id=1, video_id=2, reaction_type="like")
    reaction3 = Reaction(user_id=1, video_id=3, reaction_type="dislike")
    db.session.add_all([reaction1, reaction2, reaction3])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reactions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
