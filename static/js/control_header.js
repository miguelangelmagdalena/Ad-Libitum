$(document).ready(function(){//Cuando cargan todos los elementos del DOM



	/*Animacion en el buscador de la pagina*/
	
		$(".buscador_principal").focusin(function(){ 
				$(this).animate({
					width: "250px"
				}, 1000, function() {});
		});
		$(".buscador_principal").focusout(function(){
			
				$(this).animate({
					width: "200px"
				}, 500, function() {});
			
		});
	

	//Para activar el header
	$('a[href="#navbar-more-show"], .navbar-more-overlay').on('click', function(event) {
		event.preventDefault();
		$('body').toggleClass('navbar-more-show');
		if ($('body').hasClass('navbar-more-show'))	{
			$('a[href="#navbar-more-show"]').closest('li').addClass('active');
		}else{
			$('a[href="#navbar-more-show"]').closest('li').removeClass('active');
		}
		return false;
	});

	//Para redirigir cuando ingresa
	$('#login-nav').submit(function (){
		var url = "login.html";
		window.location.replace("login.html");
 		return false;
	});


});