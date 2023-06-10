from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .videos import seed_videos, undo_videos
from .liked_videos import seed_liked_videos, undo_liked_videos
from .disliked_videos import seed_disliked_videos, undo_disliked_videos

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
        undo_comments()
        undo_videos()
        undo_users()
        undo_liked_videos()
        undo_disliked_videos()
    seed_users()
    seed_videos()
    seed_comments()
    seed_liked_videos()
    seed_disliked_videos()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_videos()
    undo_comments()
    undo_liked_videos()
    undo_disliked_videos()
    # Add other undo functions here