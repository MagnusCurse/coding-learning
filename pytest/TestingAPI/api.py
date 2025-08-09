from flask import Flask, jsonify, request

app = Flask(__name__)

# Simulated database in memory
users = {}

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user_name = users.get(user_id)
    if user_name:
        return jsonify({"id": user_id, "user": user_name}), 200
    return jsonify({"error": "User not found"}), 404


@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user_id = data.get('id')
    user_name = data.get('user')

    if not user_id or not user_name:
        return jsonify({"error": "Invalid input"}), 400
    
    if user_id in users:
        return jsonify({"error": "User already exists"}), 400
    
    users[user_id] = user_name
    return jsonify({"id": user_id, "user": user_name}), 201
