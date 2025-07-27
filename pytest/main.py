def get_weather(temperature, humidity):
    if temperature > 30 and humidity < 50:
        return "Hot and dry"
    elif temperature > 30 and humidity >= 50:
        return "Hot and humid"
    elif temperature < 10:
        return "Cold"
    # temperature is between 10 and 30  
    else: 
        return "Mild"
