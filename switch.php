<?php
$dom=new DOMDocument();
$dom->load("doc/devices.xml");
$root=$dom->documentElement;
$lamps = $root->getElementsByTagName('lamp');

if ($_POST['type'] == "switch") {
	$pin = $_POST['pin'];
	$status = $_POST['status'];
	
	$lamp = findDevice($lamps,$pin);
	
	$file = "lampstat.txt";
	$handle = fopen($file,'w+');
	
	$string = $pin.",".$status;
	fwrite($handle,$string);
	fclose($handle);

	$stat = $lamp->getElementsByTagName("status")->item(0);
	$stat->parentNode->removeChild($stat);

	$newStat = $dom->createElement("status", $status);
	$lamp->appendChild($newStat);
	
	echo $pin.",".$status;
}
else if ($_POST['type'] == "timer") {
	$pin = $_POST['pin'];
	$time = $_POST['time'];
	$lamp = findDevice($lamps,$pin);

	$timer = $lamp->getElementsByTagName("timer")->item(0);
	if ($timer) {
		$timer->parentNode->removeChild($timer);
	}

	$newTimer = $dom->createElement("timer", $time);
	$lamp->appendChild($newTimer);

	echo $time;
}
else if ($_POST['type'] == "add") {
	$pin = $_POST['pin'];
	$name = $_POST['name'];
	// Create new device element
	$newDevice = $dom->createElement("lamp");
	// Create port attribute
	$newDevicePort = $dom->createAttribute("port");
	$newDevicePort->value = $pin;
	// Create new device name element
	$newDeviceName = $dom->createElement("name",$name);
	// Create new device status element
	$newDeviceStatus = $dom->createElement("status","OFF");
	// Append accordingly
	$root->appendChild($newDevice);
	$newDevice->appendChild($newDevicePort);
	$newDevice->appendChild($newDeviceName);
	$newDevice->appendChild($newDeviceStatus);
}
else if ($_POST['type'] == "remove") {
	$pin = $_POST['pin'];
	$lamp = findDevice($lamps,$pin);
	$lamp->parentNode->removeChild($lamp);
}
$dom->save('doc/devices.xml');

function findDevice($deviceList, $portNum)
{
	$deviceTgt = null;
	foreach ($deviceList as $device) {
		if ($device->getAttribute('port') == $portNum) {
			$deviceTgt = $device;
			break;
		}
	}
	return $deviceTgt;
}
?>
