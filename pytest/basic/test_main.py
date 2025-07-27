from main import add, divide
import pytest

def test_add():
    assert add(2, 3) == 5  # Basic addition test
    assert add(-1, 1) == 0  # Test with negative number
    assert add(0, 0) == 0  # Test with zeros

def test_divide():
    assert divide(6, 3) == 2  # Basic division test
    assert divide(5, 2) == 2.5  # Division resulting in float
    with pytest.raises(ValueError, match="Cannot divide by zero."):  # Test division by zero
        divide(1, 0)