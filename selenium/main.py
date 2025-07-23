from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

service = Service(executable_path='chromedriver.exe')  # Specify the path to your chromedriver
driver = webdriver.Chrome(service=service)

driver.get('https://www.google.com')

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CLASS_NAME, 'gLFyf'))  # Wait for the search box to be present
)

input_element = driver.find_element(By.CLASS_NAME, 'gLFyf')  # Find the search box
input_element.clear()  # Clear the search box if needed
input_element.send_keys('Tech with Tim' + Keys.ENTER)  # Type in the search box

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, "Tech With Tim"))
)

link = driver.find_element(By.PARTIAL_LINK_TEXT, "Tech With Tim")
link.click()

time.sleep(10)  # Wait for the page to load
# input("Press Enter to exit...")  # Keeps the browser open until you press Enter

driver.quit()  # Close the browser