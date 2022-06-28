from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
PATH= "C:\Program Files (x86)\chromedriver.exe"

driver=webdriver.Chrome(PATH)

driver.get("http://localhost:3000/stockchart")
print(driver.title)

k= driver.find_element_by_id("time")
k.send_keys(Keys.CONTROL + "a")
k.send_keys(Keys.DELETE)
time.sleep(2)
k.send_keys("Daily")
k.send_keys(Keys.RETURN)
time.sleep(2)

s= driver.find_element_by_id("auto")
s.send_keys(Keys.CONTROL + "a")
s.send_keys(Keys.DELETE)
time.sleep(2)
s.send_keys("VET.TRT")
s.send_keys(Keys.RETURN)
time.sleep(30)

k= driver.find_element_by_id("time")
k.send_keys(Keys.CONTROL + "a")
k.send_keys(Keys.DELETE)
time.sleep(2)
k.send_keys("Monthly")
k.send_keys(Keys.RETURN)
time.sleep(30)
######


k= driver.find_element_by_id("time")
k.send_keys(Keys.CONTROL + "a")
k.send_keys(Keys.DELETE)
time.sleep(2)
k.send_keys("Weekly")
k.send_keys(Keys.RETURN)
time.sleep(30)

a= driver.find_element_by_id("week")
a.send_keys(Keys.CONTROL + "a")
a.send_keys(Keys.DELETE)
time.sleep(2)
a.send_keys("2019")
a.send_keys(Keys.RETURN)
time.sleep(30)

a= driver.find_element_by_id("time")
a.send_keys(Keys.CONTROL + "a")
a.send_keys(Keys.DELETE)
time.sleep(2)
a.send_keys("Live")
a.send_keys(Keys.RETURN)
time.sleep(30)

a= driver.find_element_by_id("interval")
a.send_keys(Keys.CONTROL + "a")
a.send_keys(Keys.DELETE)
time.sleep(2)
a.send_keys("60m")
a.send_keys(Keys.RETURN)
time.sleep(30)

a= driver.find_element_by_id("range")
a.send_keys(Keys.CONTROL + "a")
a.send_keys(Keys.DELETE)
time.sleep(2)
a.send_keys("5d")
a.send_keys(Keys.RETURN)
time.sleep(2)



print(driver.page_source)

time.sleep(15)
driver.quit()
