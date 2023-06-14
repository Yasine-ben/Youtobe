from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # 1
    demo = User(
        username="Demo",
        first_name="Demo",
        last_name="User",
        cover_image="https://i.ibb.co/kxqQT9Y/1.png",
        email="demo@aa.io",
        password="password",
    )
    # 2
    AlmostFridayTv = User(
        username="AlmostFridayTv",
        first_name="Almost",
        last_name="Friday TV",
        cover_image="https://i.ibb.co/x34Cmbj/amostfridaytv-prof-pic.jpg",
        email="random_email1@example.com",
        password="random_password1",
    )

    # 3
    JoelHaver = User(
        username="JoelHaver",
        first_name="Joel",
        last_name="Haver",
        cover_image="https://i.ibb.co/jHrQw8s/unnamed-1.jpg",
        email="random_email2@example.com",
        password="random_password2",
    )

    # 4
    videogamedunkey = User(
        username="videogamedunkey",
        first_name="",
        last_name="",
        cover_image="https://i.ibb.co/mShpnh1/dunkey-prof-pic.jpg",
        email="random_email3@example.com",
        password="random_password3",
    )

    # 5
    KevinPowell = User(
        username="KevinPowell",
        first_name="Kevin",
        last_name="Powell",
        cover_image="https://i.ibb.co/xf411RH/images.jpg",
        email="random_email4@example.com",
        password="random_password4",
    )

    # 6
    KeyAndPeele = User(
        username="KeyAndPeele",
        first_name="Key",
        last_name="& Peele",
        cover_image="https://i.ibb.co/HN3nqQ6/unnamed.jpg",
        email="random_email5@example.com",
        password="random_password5",
    )

    # 7
    InternetHistorian = User(
        username="InternetHistorian",
        first_name="Internet",
        last_name="Historian",
        cover_image="https://i.ibb.co/RQCybQc/ih-prof-pic.jpg",
        email="random_email6@example.com",
        password="random_password6",
    )

    # 8
    NakeyJakey = User(
        username="NakeyJakey",
        first_name="Nakey",
        last_name="Jakey",
        cover_image="https://i.ibb.co/xHL2j8n/unnamed-2.jpg",
        email="random_email7@example.com",
        password="random_password7",
    )

    # 9
    styropyro = User(
        username="styropyro",
        first_name="Drake",
        last_name="drackobs",
        cover_image="https://i.ibb.co/b1MsZtP/unnamed-3.jpg",
        email="random_email8@example.com",
        password="random_password8",
    )

    # 10
    MattParker = User(
        username="Matt_Parker",
        first_name="Matt",
        last_name="Parker",
        cover_image="https://i.ibb.co/5WDVym1/unnamed-4.jpg",
        email="random_email9@example.com",
        password="random_password9",
    )

    # 11
    FilmCow = User(
        username="FilmCow",
        first_name="Film",
        last_name="Cow",
        cover_image="https://i.ibb.co/hZrfY8f/unnamed-5.jpg",
        email="random_email10@example.com",
        password="random_password10",
    )

    db.session.add(demo)
    db.session.add(AlmostFridayTv)
    db.session.add(JoelHaver)
    db.session.add(videogamedunkey)
    db.session.add(KevinPowell)
    db.session.add(KeyAndPeele)
    db.session.add(InternetHistorian)
    db.session.add(NakeyJakey)
    db.session.add(styropyro)
    db.session.add(MattParker)
    db.session.add(FilmCow)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
