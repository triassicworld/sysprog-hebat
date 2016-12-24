$(document).ready(function(){
	$('.on').click(function(){
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"switch",pin:$(this).attr('id'),status:"ON"}
		});
	});

	$('.off').click(function(){
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"switch",pin:$(this).attr('id'),status:"OFF"}
		});
	});

	$('.timer').click(function(){
		$.ajax({
			url:"switch.php",
			type:"POST",
			data:{type:"timer",pin:$(this).attr('id'),time:$("#time"+$(this).attr('id')).val()},
			success: function(response) {
				alert(response);
			}
		});
	});
});
