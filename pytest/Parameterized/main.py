# A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.
def is_prime(n):  # Function to check if a number is prime
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1): # Check divisibility from 2 to the square root of n
        if n % i == 0:
            return False
    return True