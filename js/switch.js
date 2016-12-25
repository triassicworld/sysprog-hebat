$(document).ready(function(){
	$('.onButton').click(function(){
		$.ajax({
			url:"../switch.php",
			type:"POST",
			data:{pin:$(this).attr('value'),status:"ON"},
			success: function(resp){
				alert($(this).attr('value'));
			}
		});
	});

	$('.offButton').click(function(){
		$.ajax({
			url:"../switch.php",
			type:"POST",
			data:{pin:$(this).attr('value'),status:"OFF"},
			success: function(resp){
				alert($(this).attr('value'));
			}
		});
	});
});
