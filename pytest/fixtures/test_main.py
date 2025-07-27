import pytest
from main import UserManager

@pytest.fixture
def user_manager():
    # Create an instance of UserManager before each test
    return UserManager()

def test_add_user(user_manager):
    # Test adding a new user
    assert user_manager.add_user("john_doe", "john_doe@example.com") == True
    assert user_manager.get_user("john_doe") == "john_doe@example.com"

def test_add_duplicate_user(user_manager):
    user_manager.add_user("john_doe", "john_doe@example.com")  # Add user first
    with pytest.raises(ValueError):
        # Test adding a user that already exists 
        user_manager.add_user("john_doe", "another@example.com")
    

