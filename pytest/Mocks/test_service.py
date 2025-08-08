import pytest
from service import APIClient, UserService

def test_get_username_with_mocked_api(mocker):
    mock_api_client = mocker.Mock(spec=APIClient)  # Create a mock of APIClient

    # Mocked return value for get_user_data
    mock_api_client.get_user_data.return_value = {'id': 1, 'name': 'John Doe'}

    service = UserService(mock_api_client)

    result = service.fetch_username(1)

    assert result == 'JOHN DOE'  # Check if the username is correctly uppercased
    mock_api_client.get_user_data.assert_called_once_with(1)  # Ensure the mock was called correctly

