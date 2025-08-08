import pytest
from main import get_weather

def test_get_weather(mocker):
    # Mock the requests.get method in main module
    mock_get = mocker.patch("main.requests.get")

    # Mock the response to return a successful status code and a sample JSON response
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {"temperature": 20, "condition": "Sunny"}

    # Call the function with a sample city
    result = get_weather("NewYork")

    assert result == {"temperature": 20, "condition": "Sunny"}
    # Checks that your code tried to get the weather for New York exactly once and used the correct URL.
    mock_get.assert_called_once_with("https://api.weather.com/v1/NewYork")



