$(document).ready(function(){
    $.ajax({
		url: "doc/devices.xml",
		dataType: "xml",
		success: function(result){
			tampilkanDataUser(result);
			
		},
		error: function(xhr){
			alert(xhr.status);
		}
	});
	
	$("#newDeviceButton").click(addNewDevice);
});

function addNewDevice()
{
	// Disable add button
	$("#newDeviceButton").prop('disabled',true);
	$("#newDeviceFormStat").html('Loading...');
	// Retrieve data
	$port = $("#newDevicePort").val();
	$name = $("#newDeviceName").val();
	$validPorts = [3,5,6,7,8,10,11,12,13,15,16,18,19,21,22,23,24,26,29,31,32,33,35,36,37,38,40];
	// Test 1 - Check if both form fields are filled out
	// Test 1a - Port
	if (!$port) {
		$("#newDeviceFormStat").html('Port number is required!');
		$("#newDeviceButton").prop('disabled',false);
		return;
	}
	// Test 1b - Name
	if (!$name) {
		$("#newDeviceFormStat").html('Device name is required!');
		$("#newDeviceButton").prop('disabled',false);
		return;
	}
	// Test 2 - Check if port is valid
	// Test 2a - Port must be number
	if (!$port.match(/^\d+$/)) {
		$("#newDeviceFormStat").html('Port must be a positive integer!');
		$("#newDeviceButton").prop('disabled',false);
		return;
	}
	// Test 2b - Port must be a valid GPIO port
	if ($validPorts.indexOf(parseInt($port)) < 0) {
		$("#newDeviceFormStat").html('Invalid port number! Valid port numbers are: ' + $validPorts);
		$("#newDeviceButton").prop('disabled',false);
		return;
	}
	
	// 2 main tests passed, disable add button first before continuing
	// Test 3 - Validate with XML file
	// Test 3a - Must connect to XML database file
	$.ajax({
		url: "doc/devices.xml",
		dataType: "xml",
		success: function(result){
			//Test 3b - Port number must be taken
			$lampArray = parseDeviceXML(result);
			for (var i = 0; i < $lampArray.length; i++) {
				$lamp = $lampArray[i];
				if ($lamp["port"] == $port.toString()) {
					alert("port used");
					$("#newDeviceFormStat").html('Port number is already in use!');
					return;
				}
			}
			// All tests passed
			// Send request to PHP file to modify XML file.
			$.ajax({
				url:"switch.php",
				type:"POST",
				data:{type:"add",pin:$port,name:$name},
				success: function(response) { $("#newDeviceFormStat").html('Device added!'); }
			});
			$port = $("#newDevicePort").val('');
			$name = $("#newDeviceName").val('');
			location.reload();
		},
		error: function(xhr){
			$("#newDeviceFormStat").html('Unable to connect to database!');
		},
		complete: function(response) {
			$("#newDeviceButton").prop('disabled',false);
		}
	});
}

function padfield(f){
	return (f<10)? "0"+f : f;
}

function parseDeviceXML(data)
{
	$deviceArray = [];
	$(data).find('lamp').each(function() {
		var $port=$(this).attr('port');
		var $name=$(this).find('name').text();
		var $status=$(this).find('status').text();
		var $timer = $(this).find('timer').text();
		$deviceArray.push({ name: $name, port: $port, status:$status, timer:$timer});
	});
	return $deviceArray;
}

function tampilkanDataUser(data){
	// Parse all data on XML into an array of objects: {name, port, status, timer}
	var $lampArray = parseDeviceXML(data);
	var $out="";
	// Draw table on HTML
	$out+="<table id='dtable'>";
	$out+="<tr>";
	$out+=	"<td>Device</td>";
	$out+=	"<td>Port</td>";
	$out+=	"<td>Timer</td>";
	$out+=	"<td>Action</td>";
	$out+=	"<td>Remove Device</td>";
	$out+="</tr>";
	for (var i = 0; i < $lampArray.length; i++) {
		$lamp = $lampArray[i];
		$name = $lamp["name"];
		$port = $lamp["port"];
		$status = $lamp["status"];
		$timer = $lamp["timer"];
	
		$out+=	"<tr>";
		$out+=		"<td>"+$name+"</td>";
		$out+=		"<td>"+$port+"</td>";
		$out+=		"<td>";
		$out+=			"<input type='time' id='timeInput"+$port+"' value="+$timer+">"	
		$out+=			"<button type='button' id='time"+$port+"' class='timerButton' value='"+$port+"'> Set Timer </button>";
		$out+=		"</td>";
		$out+=		"<td>";
		$out+=			"<button class='onButton' type='button' id='onBut"+$port+"' value='"+$port+"' " + ($status == "ON" ? "hidden" : "") + ">ON</button>";
		$out+=			"<button class='offButton' type='button' id='offBut"+$port+"' value='"+$port+"' " + ($status == "OFF" ? "hidden" : "") + ">OFF</button>";
		$out+=		"</td>";
		$out+=		"<td>";
		$out+=			"<button class='removeButton' type='button' id='removeBtn"+$port+"' value='"+$port+"'>Remove</button>";
		$out+=			"<span class='removeStat' id='removeStat'"+$port+"><span>";
		$out+=		"</td>";
		$out+="</tr>";
	}
	$out+="</table>";
	$('#devices').html($out);
}