from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    #1
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    #2
    drake = User(
        username='drake', email='drake@aa.io', password='password')
    #3
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    #4
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    #5
    gobbie = User(
        username='gobbie', email='gobbie@aa.io', password='password')
    #6
    scobbie = User(
        username='scobbie', email='scobbie@aa.io', password='password')
    #7
    lobbie = User(
        username='lobbie', email='lobbie@aa.io', password='password')
    #8
    tobby = User(
        username='tobby', email='tobby@aa.io', password='password')
    #9
    mobby = User(
        username='mobby', email='mobby@aa.io', password='password')

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