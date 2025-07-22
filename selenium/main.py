from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

service = Service(executable_path='chromedriver.exe')  # Specify the path to your chromedriver
driver = webdriver.Chrome(service=service)

driver.get('https://www.google.com')

input_element = driver.find_element(By.CLASS_NAME, 'gLFyf')  # Find the search box
input_element.send_keys('Selenium Python' + Keys.ENTER)  # Type in the search box

time.sleep(5)  # Wait for the page to load

driver.quit()  # Close the browser