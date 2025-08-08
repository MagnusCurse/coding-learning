import sqlite3

def save_user(name, age):
    conn = sqlite3.connect('users.db')  # Connect to the SQLite database
    cursor = conn.cursor()  # Create a cursor object to execute SQL commands
    cursor.execute("INSERT INTO  users (name, age) VALUES (?, ?)", (name, age))  # Insert user data into the users table
    conn.commit()  # Commit the transaction to save changes
    conn.close()  # Close the database connection
    
    