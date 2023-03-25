from flask import Flask, render_template, session, redirect, url_for, request, flash
from flask_bcrypt import Bcrypt
import sqlite3

# Initialization
app = Flask(__name__)
app.secret_key = 'dfadf3.vdasfli./355i9'
bcrypt = Bcrypt(app)

# SQL DATABASE Intialization
con = sqlite3.connect('database.db')
cur = con.cursor()
query = f'''
CREATE TABLE IF NOT EXISTS User(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
);
'''
cur.execute(query)
query = f'''
CREATE TABLE IF NOT EXISTS Message(
    msg_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    sender TEXT,
    receiver TEXT,
    date DATETIME,
    FOREIGN KEY (sender) REFERENCES User(username),
    FOREIGN KEY (receiver) REFERENCES User(username)
);'''
cur.execute(query)
con.commit()

@app.route('/signup')
def signup():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username']))
    return render_template('signup.html')

@app.post('/api/signup')
def check_signup():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username']))
    username = request.form['username']
    password = request.form['password']
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    try:
        con = sqlite3.connect('database.db')
        cur = con.cursor()
        query = f'''
        INSERT INTO User
        VALUES ("{username}","{pw_hash}");
        '''
        cur.execute(query)
        con.commit()
        return redirect(url_for('login'))
    except sqlite3.IntegrityError:
        flash('Username Taken. Choose Another One Please.')
        return redirect(url_for('signup'))

@app.route('/login')
def login():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username']))
    return render_template('login.html')

@app.post('/api/login')
def check_login():
    if 'username' in session:
        flash("You are already logged in.")
        return redirect(url_for('userpage', username=session['username']))
    username = request.form['username']
    password = request.form['password']
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    query = f'''
    SELECT * from User
    WHERE username="{username}";
    '''
    results = cur.execute(query).fetchall()
    print(results)
    # no such user
    if (len(results) == 0):
        flash('There is no such user.')
        return redirect(url_for('login'))
    # wrong password
    if not bcrypt.check_password_hash(results[0][1], password):
        flash('Incorrect password')
        return redirect(url_for('login'))
    # correct
    else:
        session['username'] = username
        return redirect(url_for('userpage', username=session['username']))

@app.route('/api/logout')
def logout():
    session.pop('username')
    flash('Successfully logged out!')
    return redirect(url_for('login'))

@app.route('/')
def homepage():
    if 'username' in session:
        return redirect(url_for('userpage', username=session['username']))
    return redirect(url_for('login'))

@app.route('/user/<username>')
def userpage(username):
    # not logged in
    if 'username' not in session:
        flash('Please login!')
        return redirect(url_for('login'))
    # trying to access another user
    if session['username'] != username:
        flash('Accessing forbidden user!')
        return redirect(url_for('login'))
    return render_template('index.html', username=username)


app.run(debug=True)
