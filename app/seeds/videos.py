from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


def seed_videos():
    video1 = Video( 
        title = 'Weird russian singer - Chum Drum Bedrum',
        description = "I've come to give this song",
        video = 'https://www.youtube.com/watch?v=tVj0ZTS4WF4',
        thumbnail = 'https://i.ibb.co/QH5TZ5m/weird-russian-singer.jpg',
        length = 4.05,
        uploader = 'marnie',
        user_id = 2
    )
    video2 = Video( 
        title = 'Charlie The Unicorn',
        description = 'Charlie Goes To Candy Mountain',
        video = 'https://www.youtube.com/watch?v=Q5im0Ssyyus',
        thumbnail = 'https://i.ibb.co/dgw6RYz/charlie-1.jpg',
        length = 3.45,
        uploader = 'bobbie',
        user_id = 4
    )
    video3 = Video( 
        title = 'Charlie the Unicorn 2',
        description = "Charlie's friends return to bring him on another magical adventure!",
        video = 'https://www.youtube.com/watch?v=QFCSXr6qnv4',
        thumbnail = 'https://i.ibb.co/RCT1mxS/charlie-2.jpg',
        length = 6.00,
        uploader = 'bobbie',
        user_id = 4
    )
    video4 = Video( 
        title = 'Charlie the Unicorn 3',
        description = "Charlie and his friends are on a mission to save the world!",
        video = 'https://www.youtube.com/watch?v=eaCCkfjPm0o',
        thumbnail = 'https://i.ibb.co/hszyBV7/charlie-3.jpg',
        length = 5.57,
        uploader = 'bobbie',
        user_id = 4
    )
    video5 = Video( 
        title = 'Charlie the Unicorn 4',
        description = 'Charlie and his friends are back once again for more magical adventures!',
        video = 'https://www.youtube.com/watch?v=wbF9nLhOqLU',
        thumbnail = 'https://i.ibb.co/tL2tK2v/charlie-4.jpg',
        length = 5.07,
        uploader = 'bobbie',
        user_id = 4
    )
    video6 = Video( 
        title = 'Nyan Cat [original]',
        description = 'For PJ.',
        video = 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        thumbnail = 'https://i.ibb.co/1zC6rH4/nyan.jpg',
        length = 3.36,
        uploader = 'gobbie',
        user_id = 5
    )
    video7 = Video( 
        title = 'BEST CROISSANT IN PARIS',
        description = 'none',
        video = 'https://www.youtube.com/watch?v=wp84sRpM1Js',
        thumbnail = 'https://i.ibb.co/gFPFg8j/best-croissant-in-paris.jpg',
        length = 6.40,
        uploader = 'scobbie',
        user_id = 6
    )
    video8 = Video( 
        title = "It's Peanut Butter Jelly Time!!!",
        description = "Original with song: http://www.albinoblacksheep.com/flash... Animation by Ryan Gancenia Etrata. Dancing Banana - Peanut Butter Jelly Time",
        video = 'https://www.youtube.com/watch?v=Z3ZAGBL6UBA',
        thumbnail = 'https://i.ibb.co/4gd3q3C/peanutbutter-jelly-time.jpg',
        length = 1.46,
        uploader = 'lobbie',
        user_id = 7
    )
    video9 = Video( 
        title = '"GOLD BOND LIQUI-SHAQ" - TV SHERIFF VIDEO REMIX',
        description = 'A new ditty from TV SHERIFF!!',
        video = 'https://www.youtube.com/watch?v=1tF2dF67Q2c',
        thumbnail = 'https://i.ibb.co/C1MrymS/shaq-goldbond.jpg',
        length = 1.10,
        uploader = 'tobby',
        user_id = 8
    )
    # video10 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video11 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video12 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video13 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video14 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video15 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video16 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    # video17 = Video( 
    #     title = 
    #     description = 
    #     video = 
    #     thumbnail = 
    #     length = 
    #     uploader =
    #     user_id = 
    # )
    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.add(video6)
    db.session.add(video7)
    db.session.add(video8)
    db.session.add(video9)
    # db.session.add(video10)
    # db.session.add(video11)
    # db.session.add(video12)
    # db.session.add(video13)
    # db.session.add(video14)
    # db.session.add(video15)
    # db.session.add(video16)
    # db.session.add(video17)
    db.session.commit()
    
def undo_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()