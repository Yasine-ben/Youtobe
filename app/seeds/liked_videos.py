from app.models import db, liked_videos, environment, SCHEMA
from sqlalchemy.sql import text


# Adds to demo user, you can add other users here if you want

def seed_liked_videos():
    liked_videos_data = [
        {'owner_id': 1, 'video_id': 1},
        {'owner_id': 1, 'video_id': 2},
        {'owner_id': 1, 'video_id': 3},
        {'owner_id': 2, 'video_id': 1},
        {'owner_id': 2, 'video_id': 5},
        {'owner_id': 3, 'video_id': 6}
    ]


    liked_videos_rows = []
    for data in liked_videos_data:
        liked_videos_rows.append(data)
    db.session.execute(liked_videos.insert().values(liked_videos_rows))
    db.session.commit()


def undo_liked_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.liked_videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM liked_videos"))

    db.session.commit()
