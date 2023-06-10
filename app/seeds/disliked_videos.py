from app.models import db, disliked_videos, environment, SCHEMA
from sqlalchemy.sql import text


# Adds to demo user, you can add other users here if you want

def seed_disliked_videos():
    disliked_videos_data = [
        {'owner_id': 1, 'video_id': 1},
        {'owner_id': 1, 'video_id': 2},
        {'owner_id': 1, 'video_id': 3},
        {'owner_id': 2, 'video_id': 1},
        {'owner_id': 2, 'video_id': 5},
        {'owner_id': 3, 'video_id': 6}
    ]


    disliked_videos_rows = []
    for data in disliked_videos_data:
        disliked_videos_rows.append(data)
    db.session.execute(disliked_videos.insert().values(disliked_videos_rows))
    db.session.commit()


def undo_disliked_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.liked_videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM disliked_videos"))

    db.session.commit()