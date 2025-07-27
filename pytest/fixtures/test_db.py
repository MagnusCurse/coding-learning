import pytest
from db import Database

@pytest.fixture
def db():
    # Create a new instance of the Database class for each test
    database = Database()
    # When you use yield in a pytest fixture, it effectively splits the fixture's execution into two parts: setup and teardown.
    # You can also just return the database instance if you don't need any teardown logic.
    # The crucial difference isn't whether a new instance is created, but what happens to that instance after the test finishes.
    yield database
    database.data.clear()  # Clear the database's data after each test

def test_add_user(db):
    db.add_user(1, "Alice")
    assert db.get_user(1) == "Alice"

def test_add_duplicate_user(db):
    db.add_user(1, "Alice")
    with pytest.raises(ValueError, match="User already exists!"):
        db.add_user(1, "Bob")

def test_delete_user(db):
    db.add_user(1, "Alice")
    db.delete_user(1)
    assert db.get_user(1) is None