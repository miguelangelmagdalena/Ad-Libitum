$(document).ready(function(){//Cuando cargan todos los elementos del DOM

	//1. Mostramos la información dinamicamente desde el json
	var i = 0;			//Valor Inicial
	var max_value = 4; //Cantidad de elementos maxima en el json 
	var increment = 2;	//Cantidad de elementos a mostrar hasta llegar al maximo
	more_elements_callback(i,increment,max_value);

	//Evento de ver más al hacer scroll
	$(document.body).on('touchmove', onScroll); // for mobile
	$(window).on('scroll', onScroll); 

	function onScroll(){ //Al hacer sroll hacia abajo --> cargarmas
		var windowHeight = $(window).scrollTop();
		var windowHeight2 = $(window).height();
		var documentHeight = $(document).height();
		//var contentTarget = $("#Superbutton").offset().top;
 		//console.log(windowHeight + "px / boton: " + contentTarget + "px");
		//console.log(windowHeight + "px / height: " + windowHeight2 + "px / altura " + documentHeight + "px");
		if((windowHeight + windowHeight2) >= documentHeight  ){
			$("#Superbutton").click();	
		}
	};
	

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
	
	
	//Para controlar modal anidados - ya que boostrap no lo permite
	$(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
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



});


/*****************OTRAS FUNCIONES********************************/

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}




function hide_button(){ // Elimina el botón de carga de mas publicaciones del DOM

	var item = document.getElementById("Superbutton");
	item.parentNode.removeChild(item);

	//Lo mismo pero con jquery
	//$("#Superbutton").remove();
}

function show_button(index,increment,max_value){// Agrega de nuevo el botón de carga de mas publicaciones al final de las publicaciones
	
	//1. Creamos el boton
	var item 	= document.createElement("button"); 
	item.id  	= "Superbutton";
	item.type 	= "button";
	item.title 	= "Ver más";
	item.appendChild(document.createTextNode("Ver más"));
	item.onclick= function() {
		more_elements_callback(index,increment,max_value);
	};

	//2. Agregamos el boton al final
	document.getElementById("content").appendChild(item); //Buscamos el padre para agregarle hijos
	
	//Esctructura del boton:
	//<button id="Superbutton" type="button" title="Ver más" onclick="more_elements_callback(index,increment,max_value)"> Ver más</button>
}

function more_elements_callback(index,increment,max_value){ //Funcion para agregar elementos mas despues del indice

	//Valor maximo actual
	var max = index + increment;

	//Validamos que no se pase del mayor valor del json
	if (max > max_value) {

		
		i = 0; //Para repetir todos los datos del json

		more_elements_callback(i, increment, max_value);

	}else{

		//Removemos el boton
		hide_button();

		for (i = index; i < max; i++) {

			/*var publicacion = 	"<p class='data_title' title='data_title'>"+mydata[i].title+"</p>";
			publicacion += 		"<p class='data_description' title='data_description'>"+mydata[i].description+"</p>";
			publicacion += 		"<div class='data_image' title='data_image'><img class='data_image2' title='"+mydata[i].url+"' src='"+mydata[i].url+"'></img></div>";
			*/



			var publicacion = 				"<div class='publicacion shadow border_radius'>";
			publicacion +=						"<div class='publicacion2'>";
			publicacion +=							"<div class='articulo_barra_nombre'>";		
			publicacion +=								"<div class='art_1 ''>";
			publicacion +=									"<a href='#''>";
			publicacion +=										"<h2 class='publicacion_nombre2 titulo'>"+mydata[i].titulo_articulo+"</h2>";
			publicacion +=									"</a>";
			publicacion +=									"<div class='publicacion_barra_opciones2'>";
			publicacion +=										"<div class='articulo_fecha flotar_izquierda'>"+mydata[i].fecha_creacion+"</div>";										
			publicacion +=									"</div>	";
			publicacion +=								"</div>";
			publicacion +=								"<button href='#' class='art_2'>";
			publicacion +=									"<img src='../static/images/icon-star.png'>";
			publicacion +=									"<h2 class='art_2.2'>"+mydata[i].cant_votos+"<span>/10</span></h2>";
			publicacion +=									"<a href='#'><div class='art_2_total'>"+mydata[i].cant_total+"</div></a>";
			publicacion +=								"</button>";
			publicacion +=							"</div>";
			publicacion +=							"<div class='articulo_barra_texto'>";
			publicacion +=								"<div class='articulo_multimedia'>";
			publicacion +=									"<a href='#'>";
			publicacion +=										"<img class='publicacion_multimedia2' src='"+mydata[i].multimedia_url+"'>";
			publicacion +=									"</a>";
			publicacion +=								"</div>";
			publicacion +=								"<p class='articulo_texto'>";
			publicacion +=									mydata[i].texto;
			publicacion +=								"</p>";
			publicacion +=								"<div class='articulo_barra_opciones'>";
			publicacion +=									"<ul class='social-network social-circle'>";
			publicacion +=				                        "<li><a href='#' class='icoRss' title='Rss'><i class='fa fa-rss'></i></a></li>";
			publicacion +=				                        "<li><a href='#' class='icoFacebook' title='Facebook'><i class='fa fa-facebook'></i></a></li>";
			publicacion +=				                        "<li><a href='#' class='icoTwitter' title='Twitter'><i class='fa fa-twitter'></i></a></li>";
			publicacion +=				                        "<li><a href='#' class='icoGoogle' title='Google +'><i class='fa fa-google-plus'></i></a></li>";
			publicacion +=				                        "<li><a href='#' class='icoLinkedin' title='Linkedin'><i class='fa fa-linkedin'></i></a></li>";
			publicacion +=				                    "</ul>";
			publicacion +=								"</div>";
			publicacion +=							"</div>";
			publicacion +=						"</div>";
			publicacion +=					"</div>";




/*
			
			<!--
					<div class="publicacion shadow border_radius">
						<div class="publicacion2">
							<div class="articulo_barra_nombre">				

								<div class="art_1 ">
									<a href="#">
										<h2 class="publicacion_nombre2 titulo">Titulo Articulo Lorem ipsum dolor sit amet, consectetur</h2>
									</a>
									<div class="publicacion_barra_opciones2">
										<div class="articulo_fecha flotar_izquierda">14/08/17 22:15</div>
									
									</div>					
								</div>
								<button href='#' class='art_2'>
									<img src="../static/images/icon-star.png">
									<h2 class='art_2.2'>8,9<span>/10</span></h2>
									<a href="#"><div class="art_2_total">18.808</div></a>
								</button>
								
							</div>

							<div class="articulo_barra_texto">
								<div class="articulo_multimedia">
									<a href="">
										<img class="publicacion_multimedia2" src="../static/images/probando (31).jpg">
									</a>
								</div>
								<p class="articulo_texto">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non ex ut massa maximus bibendum et et lorem. Donec dignissim posuere est ut tincidunt. Donec neque nisl, malesuada eget aliquam non, euismod ac lacus. Cras finibus augue nisl, ut luctus libero efficitur id. Sed faucibus nibh dolor, scelerisque malesuada risus pellentesque vitae. Phasellus orci odio, pulvinar sit amet arcu convallis, faucibus viverra massa. Proin quis fermentum nisl, eu iaculis purus. Ut tincidunt enim et lectus laoreet fringilla. In purus quam, semper sed porta et, interdum in lacus. Vivamus vitae lacus eget turpis maximus ornare. Aenean mattis accumsan turpis et maximus. Suspendisse pellentesque leo vel nunc auctor rhoncus.
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non ex ut massa maximus bibendum et et lorem. Donec dignissim posuere est ut tincidunt. Donec neque nisl, malesuada eget aliquam non, euismod ac lacus. Cras finibus augue nisl, ut luctus libero efficitur id. Sed faucibus nibh dolor, scelerisque malesuada risus pellentesque vitae. Phasellus orci odio, pulvinar sit amet arcu convallis, faucibus viverra massa. Proin quis fermentum nisl, eu iaculis purus. Ut tincidunt enim et lectus laoreet fringilla. In purus quam, semper sed porta et, interdum in lacus. Vivamus vitae lacus eget turpis maximus ornare. Aenean mattis accumsan turpis et maximus. Suspendisse pellentesque leo vel nunc auctor rhoncus.

								</p>
								<div class="articulo_barra_opciones">
									<ul class="social-network social-circle">
				                        <li><a href="#" class="icoRss" title="Rss"><i class="fa fa-rss"></i></a></li>
				                        <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
				                        <li><a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
				                        <li><a href="#" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a></li>
				                        <li><a href="#" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
				                    </ul>							
								</div>								
							</div>
						</div>
					</div>
					-->
*/
			$(publicacion).appendTo("#content");



			//$("<div>Hola </div>").appendTo("#comentario");


			//publicacion += 				"<div id='comentario'></div>";
			//$("#comentario").html("<div>Hola </div>");
			//$("#comentario").attr("id","");




			/*
			//Creamos data_title
			var p1 			= document.createElement("P"); 
			p1.className 	= "data_title";
			p1.title 		= "data_title";
			var text1 		= document.createTextNode(mydata[i].title); //Titulo
			var element 	= document.getElementById("content"); //Buscamos el padre para agregarle hijos
			p1.appendChild(text1);
			element.appendChild(p1);

			p1 = {};
			//Creamos data_description
			p1 				= document.createElement("P"); 
			p1.className 	= "data_description";
			p1.title 		= "data_description";
			text1 			= document.createTextNode(mydata[i].description); //Descripcion
			p1.appendChild(text1);
			element.appendChild(p1);

			p1 = {};
			//Creamos data_image
			p1 				= document.createElement("div"); 
			p1.className 	= "data_image";
			p1.title 		= "data_image";
			element.appendChild(p1);

			p1 = {};
			//Creamos data_image2
			p1 				= document.createElement("img"); 
			p1.className 	= "data_image2";
			p1.src 			= mydata[i].url; //Url de la imagen
			p1.title 		= mydata[i].url;
			elements 		= document.getElementsByClassName("data_image");
			elements[elements.length-1].appendChild(p1); 
			*/
		}

		//Agregamos el boton
		show_button(max,increment,max_value);
	}

}