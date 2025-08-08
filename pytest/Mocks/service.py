import requests
# A simple service that fetches user data from an external API
# Client to interact with the external API
class APIClient: 
    def get_user_data(self, user_id):
        response = requests.get(f"https://api.example.com/users/{user_id}")
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

# Service that uses the APIClient to get user information
class UserService:
    def __init__(self, api_client):
        self.api_client = api_client

    def fetch_username(self, user_id):
        user_data = self.api_client.get_user_data(user_id)
        return user_data['name'].upper()