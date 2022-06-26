from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
PATH= "C:\Program Files (x86)\chromedriver.exe"

driver=webdriver.Chrome(PATH)

driver.get("http://localhost:3000/")
print(driver.title)

s= driver.find_element_by_id("auto")
s.send_keys(Keys.CONTROL + "a")
s.send_keys(Keys.DELETE)
time.sleep(2)
s.send_keys("S&P/TSX 60 CA")
s.send_keys(Keys.RETURN)

time.sleep(15)
s.send_keys(Keys.CONTROL + "a")
s.send_keys(Keys.DELETE)
time.sleep(5)
s.send_keys("S&P/TSX Small Cap CA")
s.send_keys(Keys.RETURN)

time.sleep(15)
s.send_keys(Keys.CONTROL + "a")
s.send_keys(Keys.DELETE)
time.sleep(5)
s.send_keys("S&P/TSX Composite CA")
s.send_keys(Keys.RETURN)

time.sleep(15)
s.send_keys(Keys.CONTROL + "a")
s.send_keys(Keys.DELETE)
time.sleep(5)
s.send_keys("NASDAQ Composite US Market")
s.send_keys(Keys.RETURN)


print(driver.page_source)

time.sleep(15)
driver.quit()
