from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
PATH= "C:\Program Files (x86)\chromedriver.exe"

driver=webdriver.Chrome(PATH)

driver.get("http://localhost:3000/stock")
print(driver.title)

s= driver.find_element_by_id("auto")
s.send_keys(Keys.CONTROL + "a")
s.send_keys(Keys.DELETE)
time.sleep(2)
s.send_keys("VET")
s.send_keys(Keys.RETURN)

time.sleep(60)
b= driver.find_element_by_id("auto")
b.send_keys(Keys.CONTROL + "a")
b.send_keys(Keys.DELETE)
time.sleep(5)
b.send_keys("VET.TRT")
time.sleep(2)
b.send_keys(Keys.RETURN)

time.sleep(60)
c= driver.find_element_by_id("auto")
c.send_keys(Keys.CONTROL + "a")
c.send_keys(Keys.DELETE)
time.sleep(5)
c.send_keys("CVE")
time.sleep(2)
c.send_keys(Keys.SPACE)
c.send_keys(Keys.RETURN)

time.sleep(60)
d= driver.find_element_by_id("auto")
d.send_keys(Keys.CONTROL + "a")
d.send_keys(Keys.DELETE)
time.sleep(5)
d.send_keys("CVE.TRT")
d.send_keys(Keys.RETURN)


print(driver.page_source)

time.sleep(15)
driver.quit()
