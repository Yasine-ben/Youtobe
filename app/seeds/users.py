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
    drake = User(
        username="drake69",
        first_name="Drake",
        last_name="Bake",
        cover_image="https://i.ibb.co/vzSPbYd/2.png",
        email="drake@aa.io",
        password="password",
    )
    # 3
    marnie = User(
        username="marnie123",
        first_name="Marnie",
        last_name="User",
        cover_image="https://i.ibb.co/PgJCxSS/3.png",
        email="marnie@aa.io",
        password="password",
    )
    # 4
    bobbie = User(
        username="bobbie_slobbie192",
        first_name="Demo",
        last_name="User",
        cover_image="https://i.ibb.co/MnWFNf0/4.png",
        email="bobbie@aa.io",
        password="password",
    )
    # 5
    gobbie = User(
        username="gobbiegobbiegobbie",
        first_name="Demo",
        last_name="User",
        cover_image="https://i.ibb.co/PQ6vBqq/5.png",
        email="gobbie@aa.io",
        password="password",
    )
    # 6
    scobbie = User(
        username="scobbie0_0",
        first_name="Demo",
        last_name="User",
        cover_image="https://i.ibb.co/34RBgJ5/6.png",
        email="scobbie@aa.io",
        password="password",
    )
    # 7
    lobbie = User(
        username="lobbiesmobbie",
        first_name="lobbie",
        last_name="Smith",
        cover_image="https://i.ibb.co/YjRfzQx/7.png",
        email="lobbie@aa.io",
        password="password",
    )
    # 8
    tobby = User(
        username="tobbythefighter",
        first_name="toby",
        last_name="Finkja",
        cover_image="https://i.ibb.co/ky9yvHS/8.png",
        email="tobby@aa.io",
        password="password",
    )
    # 9
    mobby = User(
        username="supertoby",
        first_name="Toby",
        last_name="Sming",
        cover_image="https://i.ibb.co/wJP9NXK/9.png",
        email="mobby@aa.io",
        password="password",
    )

    db.session.add(demo)
    db.session.add(drake)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(gobbie)
    db.session.add(scobbie)
    db.session.add(lobbie)
    db.session.add(tobby)
    db.session.add(mobby)
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
