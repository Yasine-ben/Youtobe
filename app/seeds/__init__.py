from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .videos import seed_videos, undo_videos
from .reactions import seed_reactions, undo_reactions
from .subsctiptions import seed_subscriptions, undo_subscriptions
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_subscriptions()
        undo_reactions()
        undo_comments()
        undo_videos()
        undo_users()
    seed_users()
    seed_videos()
    seed_comments()
    seed_reactions()
    seed_subscriptions()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_videos()
    undo_comments()
    undo_reactions()
    undo_subscriptions()

    # Add other undo functions here