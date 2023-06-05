from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class VideoForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    video = FileField('Video File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    thumbnail = FileField('Thumbnail', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    uploader = StringField('Uploader Name', validators=[DataRequired()])
    user_id = IntegerField('User_id', validators=[DataRequired()])