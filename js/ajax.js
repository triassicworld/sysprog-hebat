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
	
	function padfield(f){
		return (f<10)? "0"+f : f;
	}
	
	var $out="";
	function tampilkanDataUser(data){
		$out+="<table id='dtable'>";
		$out+="<tr>";
			$out+="<td>Device</td>";
			$out+="<td>Port</td>";
			$out+="<td>Timer</td>";
			$out+="<td>Action</td>";
		$out+="</tr>";
		$timerArray = new Array();
		$count=0;
		$(data).find('lamp').each(function(){
			$count = $count+1;
			var $port=$(this).attr('port');
			var $name=$(this).find('name').text();
			var $status=$(this).find('status').text();
			var $timer = $(this).find('timer');
			if ($timer) {
				$timer = $timer.text().split(":");
			}
			$timerArray.push($timer);
			$out+="<tr>";
				$out+="<td>"+$name+"</td>";
				$out+="<td>"+$port+"</td>";
				$out+="<td>";
					$out+="<form action='index.html' method = 'POST'>";
						//$out+="<input type='time' name='time'> ";
						$out+="<span><select></select>:<select></select>:<select></select></span> ";
						$out+="<button type='button' id='time"+$port+"' class='timerButton'> Set Timer </button>";
					$out+="</form>";
				$out+="</td>";
				$out+="<td>";
					$out+="<form action='index.html' method = 'POST'>";
						$out+="<input class='but"+$port+"' type='submit' name='on' id='on' value='Turn On' " + ($status == "ON" ? "disabled" : "") + ">";
						$out+="<input class='but"+$port+"' type='submit' name='off' id='off' value='Turn Off' " + ($status == "OFF" ? "disabled" : "") + ">";
					$out+="</form>";
				$out+="</td>";
			$out+="</tr>";
		});
		$out+="</table>";
		$('#devices').html($out);
		
		for (var j = 0; j < $count; j++){
			var dateobj=new Date();
			var selections=document.getElementsByTagName("select");
			hourselect=selections[0+3*j];
			minuteselect=selections[1+3*j];
			secondselect=selections[2+3*j];
			
			// NOTE:
			// Index 0 is reserved for default value --:--:--
			// Index 1..60 is filled for value 00..59 (except hours, which is 00..23 on index 1..24)
			
			// Default selection, no timer set currently, or to delete timer
			hourselect[0]=new Option("--", "--", false, !$timerArray[j]);
			minuteselect[0]=new Option("--", "--", false, !$timerArray[j]);
			secondselect[0]=new Option("--", "--", false, !$timerArray[j]);			
			for (var i=0; i<60; i++){
				if (i<24) { //If still within range of hours field: 0-23
					hourselect[i+1]=new Option(padfield(i), padfield(i), false, parseInt($timerArray[j][0])==i);
				}
				minuteselect[i+1]=new Option(padfield(i), padfield(i), false, parseInt($timerArray[j][1])==i);
				secondselect[i+1]=new Option(padfield(i), padfield(i), false, parseInt($timerArray[j][2])==i);
			}
		}
	}
	
});

/*
var jsalarm={
	padfield:function(f){
		return (f<10)? "0"+f : f
	},
	showcurrenttime:function(){
		var dateobj=new Date()
		var ct=this.padfield(dateobj.getHours())+":"+this.padfield(dateobj.getMinutes())+":"+this.padfield(dateobj.getSeconds())
		this.ctref.innerHTML=ct
		this.ctref.setAttribute("title", ct)
		if (typeof this.hourwake!="undefined"){ //if alarm is set
			if (this.ctref.title==(this.hourwake+":"+this.minutewake+":"+this.secondwake)){
				clearInterval(jsalarm.timer)
				window.location=document.getElementById("musicloc").value
			}
		}
	},
	init:function(){
		var dateobj=new Date()
		this.ctref=document.getElementById("jsalarm_ct")
		this.submitref=document.getElementById("submitbutton")
		this.submitref.onclick=function(){
			jsalarm.setalarm()
			this.value="Alarm Set"
			this.disabled=true
			return false
		}
		this.resetref=document.getElementById("resetbutton")
		this.resetref.onclick=function(){
		jsalarm.submitref.disabled=false
		jsalarm.hourwake=undefined
		jsalarm.hourselect.disabled=false
		jsalarm.minuteselect.disabled=false
		jsalarm.secondselect.disabled=false
		return false
		}
		var selections=document.getElementsByTagName("select")
		this.hourselect=selections[0]
		this.minuteselect=selections[1]
		this.secondselect=selections[2]
		for (var i=0; i<60; i++){
			if (i<24) //If still within range of hours field: 0-23
			this.hourselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours()==i)
			this.minuteselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes()==i)
			this.secondselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds()==i)

		}
		jsalarm.showcurrenttime()
		jsalarm.timer=setInterval(function(){jsalarm.showcurrenttime()}, 1000)
	},
	setalarm:function(){
		this.hourwake=this.hourselect.options[this.hourselect.selectedIndex].value
		this.minutewake=this.minuteselect.options[this.minuteselect.selectedIndex].value
		this.secondwake=this.secondselect.options[this.secondselect.selectedIndex].value
		this.hourselect.disabled=true
		this.minuteselect.disabled=true
		this.secondselect.disabled=true
	}
}*/