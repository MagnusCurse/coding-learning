class Database:
    def __init__(self):
        self.data = {}
    
    def add_user(self, user_id, name):
        """Add a user to the database."""
        if user_id in self.data:
            raise ValueError("User already exists!")
        self.data[user_id] = name

    def get_user(self, user_id):
        """Retrieve a user from the database."""
        return self.data.get(user_id, None)
    
    def delete_user(self, user_id):
        """Delete a user from the database."""
        if user_id in self.data:
            del self.data[user_id]
        else:
            raise ValueError("User does not exist!")