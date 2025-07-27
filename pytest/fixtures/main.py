class UserManager:
    def __init__(self):
        # Dictionary to store users with username as key and email as value
        self.users = {} 

    def add_user(self, username, email):
        if username in self.users:  # Check if user already exists
            raise ValueError("User already exists")
        self.users[username] = email  # Add new user 
        return True
    
    def get_user(self, username):
        return self.users.get(username, None)

    