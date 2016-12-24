import RPi.GPIO as GPIO
import urllib2
import time
import xml.etree.ElementTree

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
while(True):
    try:
        time.sleep(0.1)
        response = urllib2.urlopen('file:///var/www/html/switch/doc/devices.xml')
        res = response.read()
        data = xml.etree.ElementTree.fromstring(res)

        lamps = data.findall("lamp")
        
        for lamp in lamps:
                status = lamp.find("status").text
                pin = lamp.attrib['port']

                GPIO.setup(int(pin),GPIO.OUT)
                if status =='ON':
                    GPIO.output(int(pin),True)
                elif status=='OFF':
                    GPIO.output(int(pin),False)

    except urllib2.HTTPError, e:
                 print e.code
    except urllib2.URLError, e:
                print e.args