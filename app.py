from flask import Flask, render_template, session, redirect, url_for, request, flash
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc, or_, Identity
from random import randint
import datetime

# Initialization
app = Flask(__name__)
app.secret_key = 'dfadf3.vdasfli./355i9'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# SQL DATABASE Intialization


class User(db.Model):
    username = db.Column(db.String, primary_key=True)
    password = db.Column(db.String, nullable=False)


class Message(db.Model):
    msg_id = db.Column(db.Integer, Identity(start=0, cycle=True), primary_key=True)
    content = db.Column(db.String, nullable=False)
    sender = db.Column(db.String, nullable=False)
    receiver = db.Column(db.String, db.ForeignKey(
        User.username), nullable=False)
    date = db.Column(db.String,  db.ForeignKey(User.username), nullable=False)


with app.app_context():
    db.create_all()


def get_users(username):
    usernames = []
    users = db.session.execute(
        db.select(User).filter(User.username != username))
    for user in users:
        usernames.append(user[0].username)
    return usernames


def get_messages(user, friend):
    messages = []
    msgs = db.session.execute(db.select(Message).filter(
        or_(Message.sender == user, Message.sender == friend),
        or_(Message.receiver == friend, Message.receiver == user)
    ))
    for msg in msgs:
        messages.append(
            {
                'sender': msg[0].sender,
                'receiver': msg[0].receiver,
                'content': msg[0].content,
                'date': msg[0].date
            }
        )
    return messages


@app.route('/signup')
def signup():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username'], friend='default'))
    return render_template('signup.html')


@app.post('/api/signup')
def check_signup():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username'], friend='default'))
    username = request.form['username']
    password = request.form['password']
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    try:
        new_user = User(username=username, password=pw_hash)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    except exc.IntegrityError:
        flash('Username Taken. Choose Another One Please.')
        return redirect(url_for('signup'))


@app.route('/login')
def login():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username'], friend='default'))
    return render_template('login.html')


@app.post('/api/login')
def check_login():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username'], friend='default'))
    username = request.form['username']
    password = request.form['password']
    # returns a tuple (<User pk>,) <User pk> object has attributes same as columns
    user = db.session.execute(
        db.select(User).filter_by(username=username)).first()
    # no such user
    if user == None:
        flash('There is no such user.')
        return redirect(url_for('login'))
    # wrong password
    if not bcrypt.check_password_hash(user[0].password, password):
        flash('Incorrect password')
        return redirect(url_for('login'))
    # correct
    else:
        session['username'] = username
        return redirect(url_for('userpage', username=session['username'], friend='default'))


@app.route('/api/logout')
def logout():
    session.pop('username')
    flash('Successfully logged out!')
    return redirect(url_for('login'))


@app.route('/')
def homepage():
    if 'username' in session:
        return redirect(url_for('userpage', username=session['username'], friend='default'))
    return redirect(url_for('login'))


@app.route('/user/<username>/<friend>')
def userpage(username, friend):
    # not logged in
    if 'username' not in session:
        flash('Please login!')
        return redirect(url_for('login'))
    # trying to access another user
    if session['username'] != username:
        flash('Accessing forbidden user!')
        return redirect(url_for('login'))
    users = get_users(username)
    messages = get_messages(username, friend)
    return render_template('index.html',
                           users=users, messages=messages,
                           username=username, friend=friend
                           )


@app.post('/api/send/<username>/<friend>')
def send_message(username, friend):
    new_message = Message(
        content=request.form['content'],
        sender=username,
        receiver=friend,
        date= str(datetime.datetime.now().strftime("%d/%m/%Y %H:%M"))
    )
    db.session.add(new_message)
    db.session.commit()
    return redirect(url_for('userpage', username=username, friend=friend))


if __name__ == '__main__':
    app.run(debug=True)
