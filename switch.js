$(document).ready(function(){
	$('.onButton').click(function(){
		$port = $(this).attr('value');
		$(this).prop('disabled',true);
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"switch",pin:$(this).attr('value'),status:"ON"},
			success: function(response) { $("#offBut" + $port).prop('hidden',false); $("#onBut" + $port).prop('hidden',true); },
			complete: function(response) {	$("#onBut" + $port).prop('disabled',false); }
		});
	});

	$('.offButton').click(function(){
		$port = $(this).attr('value');
		$(this).prop('disabled',true);
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"switch",pin:$(this).attr('value'),status:"OFF"},
			success: function(response) { $("#onBut" + $port).prop('hidden',false); $("#offBut" + $port).prop('hidden',true); },
			complete: function(response) {	$("#offBut" + $port).prop('disabled',false); }
		});
	});

	$('.timerButton').click(function(){
		$(this).prop('disabled',true);
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"timer", pin:$(this).attr('value'),time:$("#timeInput"+$(this).attr('value')).val()},
			complete: function(response) { $(this).prop('disabled',false)}
		});
		
	});
	
	$('.removeButton').click(function(){
		$port = $(this).attr('value');
		$(this).prop('disabled',true);
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"remove", pin:$(this).attr('value')},
			success: function(response) { $(this).prop('disabled',false); location.reload() },
			complete: function(response) { $(this).prop('disabled',false)}
		});
		
	});
});
