from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time

service = Service(executable_path='chromedriver.exe')  # Specify the path to your chromedriver
driver = webdriver.Chrome(service=service)

driver.get('https://www.google.com')

time.sleep(5)  # Wait for the page to load

driver.quit()  # Close the browser