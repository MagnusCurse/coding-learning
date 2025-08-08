from db import save_user

def test_save_user(mocker):
    # Mock the sqlite3.connect method
    mock_conn = mocker.patch("db.sqlite3.connect")
    mock_cursor = mock_conn.return_value.cursor.return_value  # Mock the cursor method

    save_user("Alice", 30)

    mock_conn.assert_called_once_with('users.db')  # Check if the database connection was made
    mock_cursor.execute.assert_called_once_with("INSERT INTO  users (name, age) VALUES (?, ?)", 
                                                ("Alice", 30))  # Check if the correct SQL command was executed