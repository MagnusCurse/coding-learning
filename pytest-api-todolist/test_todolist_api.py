import requests
import uuid

ENDPOINT = "https://todo.pixegami.io/"

def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200


# create a task
# get the task
# assert the task is created
# assert the task is the same as the payload
def test_can_create_todo_task(): 
   
    payload = new_task_payload()

    create_task_response = create_task(payload) 
    assert create_task_response.status_code == 200

    create_task_data = create_task_response.json()
    print(create_task_data)
    print(type(create_task_data))

    task_id = create_task_data.get('task').get('task_id')  # get the task_id from the create_task_data
    get_task_response = get_task(task_id)  # get the task using the task_id

    assert get_task_response.status_code == 200
    get_task_data = get_task_response.json()
    # assert the content, user_id, and is_done are the same as the payload
    assert get_task_data.get('content') == payload.get('content')
    assert get_task_data.get('user_id') == payload.get('user_id')
    assert get_task_data.get('is_done') == payload.get('is_done')


# create a task
# update the task
# get the task
# assert the task is updated
# assert the task is the same as the new_payload
def test_can_update_task():
    payload = new_task_payload()
    create_task_response = create_task(payload) # create a task first
    assert create_task_response.status_code == 200

    task_id = create_task_response.json().get('task').get('task_id')
    new_payload = {
        "content": "test_content_updated",
        "user_id": create_task_response.json().get('task').get('user_id'),
        "task_id": task_id,
        "is_done": True
    }
    
    update_task_response = update_task(new_payload)  # update the task
    assert update_task_response.status_code == 200

    get_task_response = get_task(task_id)  # retrieve the task
    assert get_task_response.status_code == 200

    # assert the content, user_id, and is_done are the same as the new_payload
    get_task_data = get_task_response.json()
    assert get_task_data.get('content') == new_payload.get('content')
    assert get_task_data.get('user_id') == new_payload.get('user_id')
    assert get_task_data.get('is_done') == new_payload.get('is_done')

# create a task in a loop
# list the tasks
# assert the number of tasks is the same as the number of tasks created
def test_can_list_tasks():
    payload = new_task_payload()
    n = 3
    for _ in range(n):
        create_task_response = create_task(payload)
        assert create_task_response.status_code == 200
    
    list_tasks_response = list_tasks(payload.get('user_id'))
    assert list_tasks_response.status_code == 200
    list_tasks_data = list_tasks_response.json()

    tasks = list_tasks_data.get('tasks') # get the tasks from the list_tasks_data
    assert len(tasks) == n  # assert the number of tasks is the same as the number of tasks created


def create_task(payload):
    return requests.put(ENDPOINT + "/create-task", json=payload)

def update_task(payload):
    return requests.put(ENDPOINT + "/update-task", json=payload)

def list_tasks(user_id):
    return requests.get(ENDPOINT + f"/list-tasks/{user_id}")

def get_task(task_id):
    return requests.get(ENDPOINT + f"/get-task/{task_id}")


def new_task_payload():
    # make sure the user_id and content are unique everytime we create a new task
    user_id = f"test_user_{uuid.uuid4().hex}"  # generate a random user_id
    content = f"test_content_{uuid.uuid4().hex}"  # generate a random content

    return {
        "content": content,
        "user_id": user_id,
        "is_done": False
    }



   






