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
		// Parse all data on XML into an array of objects: {name, port, status, timer}
		var $lampArray = [];
		$(data).find('lamp').each(function() {
			var $port=$(this).attr('port');
			var $name=$(this).find('name').text();
			var $status=$(this).find('status').text();
			var $timer = $(this).find('timer').text();
			$lampArray.push({ name: $name, port: $port, status:$status, timer:$timer});
		});
		// Draw table on HTML
		$out+="<table id='dtable'>";
		$out+="<tr>";
			$out+="<td>Device</td>";
			$out+="<td>Port</td>";
			$out+="<td>Timer</td>";
			$out+="<td>Action</td>";
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
			$out+="</tr>";
		}
		$out+="</table>";
		$('#devices').html($out);
		/*
		// Insert timer data according to XML file
		for (var j = 0; j < $lampArray.length; j++){
			$lamp = $lampArray[j];
			$timer = $lamp["timer"];
			hourselect=document.getElementById("timerSelectHour" + $lamp["port"]);
			minuteselect=document.getElementById("timerSelectMinute" + $lamp["port"]);
			secondselect=document.getElementById("timerSelectSecond" + $lamp["port"]);;
			
			// NOTE:
			// Index 0 is reserved for default value --:--:--
			// Index 1..60 is filled for value 00..59 (except hours, which is 00..23 on index 1..24)
			
			// Default selection, no timer set currently, or to delete timer
			hourselect[0]=new Option("--", "--", false, !$timer);
			minuteselect[0]=new Option("--", "--", false, !$timer);
			secondselect[0]=new Option("--", "--", false, !$timer);			
			for (var i=0; i<60; i++){
				if (i<24) { //If still within range of hours field: 0-23
					hourselect[i+1]=new Option(padfield(i), padfield(i), false, $timer && parseInt($timer[0])==i);
				}
				minuteselect[i+1]=new Option(padfield(i), padfield(i), false, $timer && parseInt($timer[1])==i);
				secondselect[i+1]=new Option(padfield(i), padfield(i), false, $timer && parseInt($timer[2])==i);
			}
		}
		*/
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