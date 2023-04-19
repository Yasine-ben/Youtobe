from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class VideoForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    video = StringField('Video File', validators=[DataRequired()])
    thumbnail = StringField('Thumbnail', validators=[DataRequired()])
    length = IntegerField('Video Length', validators=[DataRequired()])
    uploader = StringField('Uploader Name', validators=[DataRequired()])
    user_id = IntegerField('User_id', validators=[DataRequired()])