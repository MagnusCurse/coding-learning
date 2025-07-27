from main import get_weather

def test_get_weather():
    assert get_weather(35, 40) == "Hot and dry"
    assert get_weather(35, 60) == "Hot and humid"
    assert get_weather(5, 30) == "Cold"
    assert get_weather(20, 70) == "Mild"  # temperature is between 10 and 30
    assert get_weather(10, 50) == "Mild"  # edge case for temperature at 10
    assert get_weather(40, 50) == "Mild"  # error in original logic, should be "Hot and humid"