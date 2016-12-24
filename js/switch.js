$(document).ready(function(){
	$('.on').click(function(){
		$.ajax({
			url:"php/switch.php",
			type:"POST",
			data:{pin:$(this).attr('id'),status:"ON"}
		});
	});

	$('.off').click(function(){
		$.ajax({
			url:"php/switch.php",
			type:"POST",
			data:{pin:$(this).attr('id'),status:"OFF"}
		});
	});
});
