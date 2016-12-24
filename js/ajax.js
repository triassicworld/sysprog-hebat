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
	
	var $out="";
	var counter=0;
	function tampilkanDataUser(data){
		$out+="<table id='dtable'>";
		$out+="<tr>";
			$out+="<td>Device</td>";
			$out+="<td>Timer</td>";
			$out+="<td>Action</td>";
		$out+="</tr>";
		$(data).find('lamp').each(function(){
			var port = $(this).attr('port');
			$out+="<tr>";
				$out+="<td>"+port+"</td>";
				$out+="<td>";
						$out+="<input type='time' id='time"+port+"'> ";
						$out+="<button class='timer' id='"+port+"'>Set Timer</button> ";
				$out+="</td>";
				$out+="<td>";
						$out+="<input class='on' type='submit' name='on' id='"+port+"' value='Turn On'> ";
						$out+="<input class='off' type='submit' name='off' id='"+port+"' value='Turn Off'> ";
				$out+="</td>";
			$out+="</tr>";
		});
		$out+="</table>";
		$('#devices').html($out);	
	}
	
});