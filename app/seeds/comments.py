from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment1 = Comment(
        comment = "Trash Video!!!", 
        user_name = 'drake',
        user_id = 2,
        video_id = 1
    )
    comment2 = Comment(
        comment = "This video is fire as hell!!!", 
        user_name = 'marnie',
        user_id = 3,
        video_id = 1
    )
    comment3 = Comment(
        comment = "Best video of all time ya feel me.", 
        user_name = 'bobbie',
        user_id = 4,
        video_id = 1
    )
    comment4 = Comment(
        comment = "First", 
        user_name = 'gobbie',
        user_id = 5,
        video_id = 1
    )
    comment5 = Comment(
        comment = "Second", 
        user_name = 'scobbie',
        user_id = 6,
        video_id = 1
    )
    comment6 = Comment(
        comment = "HuH?", 
        user_name = 'lobbie',
        user_id = 7,
        video_id = 1
    )
    comment7 = Comment(
        comment = "UR mom", 
        user_name = 'tobby',
        user_id = 8,
        video_id = 1
    )
    comment8 = Comment(
        comment = "This is a comment", 
        user_name = 'mobby',
        user_id = 9,
        video_id = 1
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.commit()
    
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()