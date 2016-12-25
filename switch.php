<?php
$dom=new DOMDocument();
$dom->load("doc/devices.xml");
$root=$dom->documentElement;

$pin = $_POST['pin'];

$lamp = null;
$lamps = $root->getElementsByTagName('lamp');

foreach ($lamps as $lampTmp) {
	if ($lampTmp->getAttribute('port') == $pin) {
		$lamp = $lampTmp;
		break;
	}
}

//$lamp = $root->getElementsByTagName("lamp");

if ($_POST['type'] == "switch") {
	$file = "lampstat.txt";
	$handle = fopen($file,'w+');

	$status = $_POST['status'];

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
	$time = $_POST['time'];

	$timer = $lamp->getElementsByTagName("timer")->item(0);
	if ($timer) {
		$timer->parentNode->removeChild($timer);
	}

	$newTimer = $dom->createElement("timer", $time);
	$lamp->appendChild($newTimer);

	echo $time;
}

$dom->save('doc/devices.xml');
?>
