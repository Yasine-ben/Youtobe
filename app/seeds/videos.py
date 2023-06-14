from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random

date_format = '%a, %d %b %Y %H:%M:%S %Z'

def seed_videos():
    def random_date():
        start_date = datetime(2000, 1, 1)
        end_date = datetime(2023, 12, 31)
        delta = end_date - start_date
        random_days = random.randint(0, delta.days)
        return start_date + timedelta(days=random_days)
    
    video1 = Video( 
        title = 'Weird russian singer - Chum Drum Bedrum',
        description = "I've come to give this ",
        video = 'https://www.youtube.com/watch?v=tVj0ZTS4WF4',
        thumbnail = 'https://i.ibb.co/QH5TZ5m/weird-russian-singer.jpg',
        length = 4.05,
        uploader = 'Demo',
        cover_image = 'https://i.ibb.co/kxqQT9Y/1.png',
        user_id = 1,
        created_at = random_date(),
        updated_at = random_date(),
        views = 90000000,
    )
    video2 = Video( 
        title = 'Charlie The Unicorn',
        description = 'Charlie Goes To Candy Mountain',
        video = 'https://www.youtube.com/watch?v=Q5im0Ssyyus',
        thumbnail = 'https://i.ibb.co/dgw6RYz/charlie-1.jpg',
        length = 3.45,
        uploader = 'FilmCow',
        cover_image = 'https://i.ibb.co/hZrfY8f/unnamed-5.jpg',
        user_id = 11,
        created_at = random_date(),
        updated_at = random_date(),
        views = 68000000,    
    )
    video3 = Video( 
        title = 'Charlie the Unicorn 2',
        description = "Charlie's friends return to bring him on another magical adventure!",
        video = 'https://www.youtube.com/watch?v=QFCSXr6qnv4',
        thumbnail = 'https://i.ibb.co/RCT1mxS/charlie-2.jpg',
        length = 6.00,
        uploader = 'FilmCow',
        cover_image = 'https://i.ibb.co/hZrfY8f/unnamed-5.jpg',
        user_id = 11,
        created_at = random_date(),
        updated_at = random_date(),
        views = 50000000,    
    )
    video4 = Video( 
        title = 'Charlie the Unicorn 3',
        description = "Charlie and his friends are on a mission to save the world!",
        video = 'https://www.youtube.com/watch?v=eaCCkfjPm0o',
        thumbnail = 'https://i.ibb.co/hszyBV7/charlie-3.jpg',
        length = 5.57,
        uploader = 'FilmCow',
        cover_image = 'https://i.ibb.co/hZrfY8f/unnamed-5.jpg',
        user_id = 11,
        created_at = random_date(),
        updated_at = random_date(),
        views = 30000000,    
    )
    video5 = Video( 
        title = 'Charlie the Unicorn 4',
        description = 'Charlie and his friends are back once again for more magical adventures!',
        video = 'https://www.youtube.com/watch?v=wbF9nLhOqLU',
        thumbnail = 'https://i.ibb.co/tL2tK2v/charlie-4.jpg',
        length = 5.07,
        uploader = 'FilmCow',
        cover_image = 'https://i.ibb.co/hZrfY8f/unnamed-5.jpg',
        user_id = 11,
        created_at = random_date(),
        updated_at = random_date(),
        views = 11000000,    
    )
    video6 = Video( 
        title = 'Nyan Cat [original]',
        description = 'For PJ.',
        video = 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        thumbnail = 'https://i.ibb.co/1zC6rH4/nyan.jpg',
        length = 3.36,
        uploader = 'Demo',
        cover_image = 'https://i.ibb.co/kxqQT9Y/1.png',
        user_id = 1,
        created_at = random_date(),
        updated_at = random_date(),
        views = 206000000,    
    )
    video7 = Video( 
        title = 'BEST CROISSANT IN PARIS',
        description = 'none',
        video = 'https://www.youtube.com/watch?v=wp84sRpM1Js',
        thumbnail = 'https://i.ibb.co/gFPFg8j/best-croissant-in-paris.jpg',
        length = 6.40,
        uploader = 'Demo',
        cover_image = 'https://i.ibb.co/kxqQT9Y/1.png',
        user_id = 1,
        created_at = random_date(),
        updated_at = random_date(),
        views = 1000000,    
    )
    video8 = Video( 
        title = "It's Peanut Butter Jelly Time!!!",
        description = "Original with song: http://www.albinoblacksheep.com/flash... Animation by Ryan Gancenia Etrata. Dancing Banana - Peanut Butter Jelly Time",
        video = 'https://www.youtube.com/watch?v=Z3ZAGBL6UBA',
        thumbnail = 'https://i.ibb.co/4gd3q3C/peanutbutter-jelly-time.jpg',
        length = 1.46,
        uploader = 'Demo',
        cover_image = 'https://i.ibb.co/kxqQT9Y/1.png',
        user_id = 1,
        created_at = random_date(),
        updated_at = random_date(),
        views = 51000000,    
    )
    video9 = Video( 
        title = '"GOLD BOND LIQUI-SHAQ" - TV SHERIFF VIDEO REMIX',
        description = 'A new ditty from TV SHERIFF!!',
        video = 'https://www.youtube.com/watch?v=1tF2dF67Q2c',
        thumbnail = 'https://i.ibb.co/C1MrymS/shaq-goldbond.jpg',
        length = 1.10,
        uploader = 'Demo',
        cover_image = 'https://i.ibb.co/kxqQT9Y/1.png',
        user_id = 1,
        created_at = random_date(),
        updated_at = random_date(),
        views = 9800000,    
    )
    video10 = Video( 
        title = "Trapped",
        description = "This is totally not based on a real story where a guy recently did this to one of us at a party. Featuring: Cody Ko, Will Angus, Liam Cullagh, Chet Collins, Billy Langdon, Jason Protass, Emily Binder Director: Tyler Falbo Writers: Almost Friday TV Producer: Joe Pomeroy DP: Matt Tipold AC: Dave Redman Editor: Gerry Kenah Sound: Mike Robertson Production Design: Rick Mader and Leigh Mader Gaffer: Ilya Chegodar  Swing: Paul Deorio Color: Matt Tipold Production Assistants: Dylan Walker and Sam Hopko How to Save a Life Remix: Stillwell",
        video = 'https://www.youtube.com/watch?v=odwsoDsClcM&t=4s',
        thumbnail = 'https://i.ibb.co/58nZHJ9/Trapped.jpg',
        length = 5.32,
        uploader ='AlmostFridayTv',
        cover_image = "https://i.ibb.co/x34Cmbj/amostfridaytv-prof-pic.jpg",
        user_id = 2,
        created_at = random_date(),
        updated_at = random_date(),
        views = 494538, 
    )
    video11 = Video( 
        title = "Joker's Most Devious Plan Yet",
        description = "Featuring Cherdleys and mollygarcia " ,
        video = "https://www.youtube.com/watch?v=S7M24KrqhBw",
        thumbnail = "https://i.ibb.co/1mTKL6K/Joker-s-Most-Devious-Plan-Yet.jpg",
        length = 5.23,
        uploader = "Joel Haver",
        cover_image = "https://i.ibb.co/jHrQw8s/unnamed-1.jpg",
        user_id = 3,
        created_at = random_date(),
        updated_at = random_date(),
        views = 3513433, 
    )
    video12 = Video( 
        title = "How I Animated This Video",
        description = "Enjoy this video about how I made this video!" ,
        video = "https://www.youtube.com/watch?v=tq_KOmXyVDo",
        thumbnail = "https://i.ibb.co/VSnJCRx/How-I-Animated-This-Video.jpg",
        length = 7.18,
        uploader = "Joel Haver",
        cover_image = "https://i.ibb.co/jHrQw8s/unnamed-1.jpg",
        user_id = 3,
        created_at = random_date(),
        updated_at = random_date(),
        views = 4800000,
    )
    video13 = Video( 
        title = "The Stanley's Parable",
        description = "Shut up Michael, I'm only working here for the pretzel day - Stanley Parable.",
        video = "https://www.youtube.com/watch?v=XftJTSLyMNE",
        thumbnail = "https://i.ibb.co/MncKqFt/The-Stanley-s-Parable.jpg",
        length = 8.42,
        uploader = "videogamedunkey",
        cover_image = "https://i.ibb.co/mShpnh1/dunkey-prof-pic.jpg",
        user_id = 4,
        created_at = random_date(),
        updated_at = random_date(),
        views = 3614943, 
    )
    video14 = Video( 
        title = "The simple trick to transition from height 0 to auto with CSS",
        description = "Animating or transitioning to and from height auto is, well, not really possible (though it is being worked on!), but luckily, there is actually a solution using CSS Grid that's really easy to implement!" ,
        video = "https://www.youtube.com/watch?v=B_n4YONte5A",
        thumbnail = "https://i.ibb.co/RYsFqNy/kev.webp",
        length = 4.26,
        uploader = "Kevin Powell",
        cover_image = "https://i.ibb.co/xf411RH/images.jpg",
        user_id = 5,
        created_at = random_date(),
        updated_at = random_date(),
        views = 104096, 
    )
    video15 = Video( 
        title = "Continental Breakfast",
        description = "An enthusiastic hotel guest takes full advantage of the complimentary continental breakfast." ,
        video = "https://www.youtube.com/watch?v=st21dIMaGMs",
        thumbnail = "https://i.ibb.co/sttqLYg/key.jpg",
        length = 5.08,
        uploader = "Key & Peele",
        cover_image = "https://i.ibb.co/HN3nqQ6/unnamed.jpg",
        user_id = 6,
        created_at = random_date(),
        updated_at = random_date(),
        views = 51000000, 
    )
    video16 = Video( 
        title = "The Cost of Concordia",
        description = "Go to https://NordVPN.com/internethistorian and use code INTERNETHISTORIAN to get a 2-year plan plus 1 additional month with a huge discount. It's risk free with Nord's 30 day money-back guarantee!" ,
        video = "https://www.youtube.com/watch?v=Qh9KBwqGxTI",
        thumbnail = "https://i.ibb.co/njDxd5T/costa.webp",
        length = 46.48,
        uploader = "Internet Historian",
        cover_image = "https://i.ibb.co/RQCybQc/ih-prof-pic.jpg",
        user_id = 7,
        created_at = random_date(),
        updated_at = random_date(),
        views = 18451196, 
    )
    video17 = Video( 
        title = "spooky.",
        description = "Go to https://nordpass.com/incognito and use code incognito to get 70% off a 2 year NordPass Premium plan plus 1 free month! It's risk free with 30 day money-back guarantee!" ,
        video = "https://www.youtube.com/watch?v=KhQL58CYyRQ",
        thumbnail = "https://i.ibb.co/x72WYRL/spooky.webp",
        length = 25.04,
        uploader = "Internet Historian",
        cover_image = "https://i.ibb.co/RQCybQc/ih-prof-pic.jpg",
        user_id = 7,
        created_at = random_date(),
        updated_at = random_date(),
        views = 1301200, 
    )
    video18 = Video( 
        title = "FromSoftware's Game Design Changed Everything",
        description = "that rat really was a king at one point" ,
        video = "https://www.youtube.com/watch?v=akoK3U2ZNXM",
        thumbnail = "https://i.ibb.co/FKC22dJ/fromsoft.jpg",
        length = 30.00,
        uploader = "NakeyJakey",
        cover_image = "https://i.ibb.co/xHL2j8n/unnamed-2.jpg",
        user_id = 8,
        created_at = random_date(),
        updated_at = random_date(),
        views = 12312, 
    )
    video19 = Video( 
        title = 'Testing dangerous DIY "medical" lasers from eBay',
        description = "I stumbled across some ridiculous eBay listings for DIY medical and cosmetic lasers recently, and I couldn't resist the urge to test some of them out. They turned out more horrible than I could have imagined!!" ,
        video = "https://www.youtube.com/watch?v=DbzbIGkPW-o&t=867s",
        thumbnail = "https://i.ibb.co/SnHgyvW/laser.webp",
        length = "18.42",
        uploader = "styropyro",
        cover_image = "https://i.ibb.co/b1MsZtP/unnamed-3.jpg",
        user_id = 9,
        created_at = random_date(),
        updated_at = random_date(),
        views = 2771769, 
    )
    video20 = Video( 
        title = "I run untested, viewer-submitted code on my 500-LED christmas tree.",
        description = "I think that went well! Head over to github to see some of the code involved." ,
        video = "https://www.youtube.com/watch?v=v7eHTNm1YtU",
        thumbnail = "https://i.ibb.co/DtR8Vkm/Tree.jpg",
        length = "45.16",
        uploader = "Matt_Parker",
        cover_image = "https://i.ibb.co/5WDVym1/unnamed-4.jpg",
        user_id = 10,
        created_at = random_date(),
        updated_at = random_date(),
        views = 7709255, 
    )
    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.add(video6)
    db.session.add(video7)
    db.session.add(video8)
    db.session.add(video9)
    db.session.add(video10)
    db.session.add(video11)
    db.session.add(video12)
    db.session.add(video13)
    db.session.add(video14)
    db.session.add(video15)
    db.session.add(video16)
    db.session.add(video17)
    db.session.add(video18)
    db.session.add(video19)
    db.session.add(video20)
    db.session.commit()
    
def undo_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()