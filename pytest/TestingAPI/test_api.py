import pytest
from api import app

@pytest.fixture
def client():
    app.config['TESTING'] = True  # Enable testing mode
    # Create a test client for the Flask application
    with app.test_client() as client:
        yield client  # provides the client for the test


def create_user(client):
    # send a POST request to create a user
    response = client.post('/users', json={"id": 1, "user": "Alice"})  
    assert response.status_code == 201
    assert response.json == {"id": 1, "user": "Alice"}


def test_get_user(client):
    client.post('/users', json={"id": 2, "user": "Kevin"})  # Create a user for testing

    # Send a GET request to retrieve the user
    response = client.get('/users/2')
    assert response.status_code == 200
    assert response.json == {"id": 2, "user": "Kevin"}


def test_user_not_found(client):
    # Attempt to retrieve a user that does not exist
    response = client.get('/users/999')
    assert response.status_code == 404
    assert response.json == {"error": "User not found"}


def test_duplicate_user(client):
    client.post('/users', json={"id": 3, "user": "Bob"})  # Create a user for testing

    # Attempt to create a user with the same ID
    response = client.post('/users', json={"id": 3, "user": "Charlie"})
    assert response.status_code == 400
    assert response.json == {"error": "User already exists"}
