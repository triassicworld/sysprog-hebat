# import RPi.GPIO as GPIO
import urllib2
import time
import xml.etree.ElementTree
from datetime import datetime

# GPIO.setwarnings(False)
# GPIO.setmode(GPIO.BOARD)
while(True):
    try:
        time.sleep(0.1)
        response = urllib2.urlopen('file:///c:/xampp/htdocs/sysprog-hebat/doc/devices.xml')
        res = response.read()
        data = xml.etree.ElementTree.fromstring(res)

        lamps = data.findall("lamp")
        currTime = str(datetime.now().strftime('%H:%M'));
        print ("time :",currTime)
        
        for lamp in lamps:
                status = lamp.find("status").text
                pin = lamp.attrib['port']
                timer = lamp.find("timer").text
                print "timer :",timer
                print currTime==timer

                # GPIO.setup(int(pin),GPIO.OUT)
                if status =='ON':
                    # GPIO.output(int(pin),True)
                    print(pin,"nyala")
                if status=='OFF' or timer == currTime:
                    print(pin,"mati")
                    # GPIO.output(int(pin),False)
        print("")

    except urllib2.HTTPError, e:
                 print e.code
    except urllib2.URLError, e:
                print e.args