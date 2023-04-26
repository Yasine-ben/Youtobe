from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    userE = User.query.filter(User.email == email).first()
    userN = User.query.filter(User.username == email).first()
    if not userE and not userN:
        raise ValidationError("Email or username provided not found.")


def password_matches(form, field):
    # Checking if password matches
    # print('/////////////////////////////////////////////////////////////////////////')
    password = field.data
    email = form.data["email"]
    userE = User.query.filter(User.email == email).first()
    userN = User.query.filter(User.username == email).first()
    print("USSSSEEERRRR ?????????????????????? +?????? ", userN)
    if not userE and not userN:
        raise ValidationError("No such user exists.")
    if userE:
        if not userE.check_password(password):
            raise ValidationError("Password was incorrect.")
    if userN:
        if not userN.check_password(password):
            raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    email = StringField("email", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired(), password_matches])
