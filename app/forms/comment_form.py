from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class CommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired()])
    user_name = StringField('Users Name', validators=[DataRequired()])
    user_id = IntegerField('User_id', validators=[DataRequired()])
    video_id = IntegerField('Video_id', validators=[DataRequired()])