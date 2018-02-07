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
	
	
	
	//Para controlar modal anidados - ya que boostrap no lo permite
	$(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });





	//Boton de calificar
	$('.art_2_toggle2').click(function() {
	 	
	});

	$(function() {
	  $('.tooltip_star').hover(function() {
	    $( this ).children('.art_2_toggle1').css('display', 'none');
	    $( this ).children('.art_2_toggle2').css('display', 'block');
	  }, function() {
	    // on mouseout, reset the background colour
	    $( this ).children('.art_2_toggle1').css('display', 'block');
	    $( this ).children('.art_2_toggle2').css('display', 'none');
	  });
	});

	//Open modal con url
	var url      	= window.location.href;
	var modal_code 	= getParameterByName("modal",url);

	if(window.location.href.indexOf('?modal='+modal_code) != -1) {
    	$('#myModal'+modal_code).modal('show');
    	/*Like a query string
		http://www.website.com/page.html?modal=1
		http://www.website.com/page.html?modal=2
		...
    	*/
  	}
	
});


/*****************OTRAS FUNCIONES********************************/
function getParameterByName(name, url) { //Obtiene un value de un query string
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));

    /*EJEMPLO
	// query string: ?foo=lorem&bar=&baz
	var foo = getParameterByName('foo'); // "lorem"
	var bar = getParameterByName('bar'); // "" (present with empty value)
	var baz = getParameterByName('baz'); // "" (present with no value)
	var qux = getParameterByName('qux'); // null (absent)
    */
}


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
			publicacion +=								"<div class='art_1 '>";
			publicacion +=									"<a data-toggle='modal' href='#myModal"+mydata[i].id+"'>";
			publicacion +=										"<h2 class='publicacion_nombre2 titulo'>"+mydata[i].titulo_articulo+"</h2>";
			publicacion +=									"</a>";
			publicacion +=									"<div class='publicacion_barra_opciones2'>";
			publicacion +=										"<div class='articulo_fecha flotar_izquierda'>"+mydata[i].fecha_creacion+" </div> ";										
			
			var categorias_lenght = mydata[i].categorias.length;
			for(j = 0; j<categorias_lenght; j++){

				var text;
				switch(mydata[i].categorias[j]) {
				    case "*Popular*":
				        text = "primary";
				        break;
				    case "Pop":
				        text = "primary";
				        break;
				    case "Reggaeton":
				        text = "default";
				        break;
				    case "Clásica":
				        text = "success";
				        break;
					case "Jazz":
				        text = "danger";
				        break;
				    case "Indie":
				        text = "warning";
				        break;
				    case "Eléctronica":
				        text = "info";
				        break;
				    case "Hip-Hop/Rap":
				        text = "danger";
				        break;
				    case "Folklore Venezolano":
				        text = "warning";
				        break;
				    case "Latin":
				        text = "info";
				        break;				     
				    default:
				        text = "primary";
				}

				var categorias = 									"<a href='#' class='label label-"+text+"'>"+mydata[i].categorias[j]+"</a> ";
				publicacion += categorias;
			}
			publicacion +=									"</div>	";
			publicacion +=								"</div>";

			publicacion +=								"<div class='tooltip_star'>";
			publicacion +=									"<button href='#' class='art_2 art_2_toggle1'>";
			publicacion +=										"<span class='tooltip_star_icon glyphicon glyphicon-star'></span>";
			publicacion +=										"<h2 class='art_2.2'>"+mydata[i].cant_votos+"<span>/10</span></h2>";
			publicacion +=										"<a href='#'><div class='art_2_total'>"+mydata[i].cant_total+"</div></a>";
			publicacion +=									"</button>";
			publicacion +=									"<button href='#' class='art_2 art_2_toggle2'>";
			publicacion +=											"<span class='tooltip_star_icon2 glyphicon glyphicon-remove'></span>";
			publicacion +=											"<span class='art_2_3'>Cancelar</span>";
			publicacion +=									"</button>";
			publicacion +=									"<div class='tooltip_star_content moon_left'>";
			publicacion +=											"<fieldset class='rating'>";
			publicacion +=												"<input type='radio' class='star5' name='rating' value='5' /><label class='glyphicon glyphicon-star' for='star5' title='Excelente!'>5 stars</label>";
			publicacion +=												"<input type='radio' class='star4' name='rating' value='4' /><label class='glyphicon glyphicon-star' for='star4' title='Bueno'>4 stars</label>";
			publicacion +=												"<input type='radio' class='star3' name='rating' value='3' /><label class='glyphicon glyphicon-star' for='star3' title='Regular'>3 stars</label>";
			publicacion +=												"<input type='radio' class='star2' name='rating' value='2' /><label class='glyphicon glyphicon-star' for='star2' title='Malo'>2 stars</label>";
			publicacion +=												"<input type='radio' class='star1' name='rating' value='1' /><label class='glyphicon glyphicon-star' for='star1' title='Muy malo'>1 star</label>";
			publicacion +=											"</fieldset>";
			publicacion +=									"</div>";
			publicacion +=								"</div>	"	;
			publicacion +=							"</div>";

			publicacion +=							"<div class='articulo_barra_texto'>";
			publicacion +=								"<div class='articulo_multimedia'>";
			publicacion +=									"<a data-toggle='modal' href='#myModal"+mydata[i].id+"'>";
			publicacion +=										"<img class='publicacion_multimedia2' src='"+mydata[i].multimedia_url+"'>";
			publicacion +=									"</a>";
			publicacion +=								"</div>";
			publicacion +=								"<p class='articulo_texto cursor_pointer' data-toggle='modal' href='#myModal"+mydata[i].id+"'>";
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


			/*Ahora subimos el modal*/

			publicacion +=          "<div class='modal fade' id='myModal"+mydata[i].id+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>";
			publicacion +=            "<div class='modal-dialog modal-lg' role='document'>";
			publicacion +=              "<div class='modal-content'>";
			publicacion +=                "<div class='modal-header'>";
			publicacion +=                  "<div class='art_1 '>";
			publicacion +=										"<a>"
			publicacion +=											"<h2 class='publicacion_nombre2 titulo'>"+mydata[i].titulo_articulo+"</h2>";
			publicacion +=									"</a>";
			publicacion +=										"<div class='publicacion_barra_opciones2'>";
			publicacion +=											"<div class='articulo_fecha flotar_izquierda'>"+mydata[i].fecha_creacion+"</div>";

			for(j = 0; j<categorias_lenght; j++){

				var text;
				switch(mydata[i].categorias[j]) {
				    case "*Popular*":
				        text = "primary";
				        break;
				    case "Pop":
				        text = "primary";
				        break;
				    case "Reggaeton":
				        text = "default";
				        break;
				    case "Clásica":
				        text = "success";
				        break;
					case "Jazz":
				        text = "danger";
				        break;
				    case "Indie":
				        text = "warning";
				        break;
				    case "Eléctronica":
				        text = "info";
				        break;
				    case "Hip-Hop/Rap":
				        text = "danger";
				        break;
				    case "Folklore Venezolano":
				        text = "warning";
				        break;
				    case "Latin":
				        text = "info";
				        break;				     
				    default:
				        text = "primary";
				}

				var categorias = 									"<a href='#' class='label label-"+text+"'>"+mydata[i].categorias[j]+"</a> ";
				publicacion += categorias;
			}

			publicacion +=										"</div>"	;
			publicacion +=									"</div>";
			publicacion +=               	"<div class='tooltip_star'>";
			publicacion +=								"<button href='#' class='art_2 art_2_toggle1'>";
			publicacion +=									"<span class='tooltip_star_icon glyphicon glyphicon-star'></span>";
			publicacion +=									"<h2 class='art_2.2'>"+mydata[i].cant_votos+"<span>/10</span></h2>";
			publicacion +=									"<a href='#'> <div class='art_2_total'>"+mydata[i].cant_total+"</div></a>";
			publicacion +=								"</button>";
			publicacion +=								"<button href='#' class='art_2 art_2_toggle2'>";
			publicacion +=									"<span class='tooltip_star_icon2 glyphicon glyphicon-remove'></span>";
			publicacion +=									"<span class='art_2_3'>Cancelar</span>";
			publicacion +=								"</button>";
			publicacion +=								"<div class='tooltip_star_content moon_left'>";
			publicacion +=									"<fieldset class='rating'>";
			publicacion +=								    "<input type='radio' class='star5' name='rating' value='5' /><label class='glyphicon glyphicon-star' for='star5' title='Excelente!'>5 stars</label>";
			publicacion +=								    "<input type='radio' class='star4' name='rating' value='4' /><label class='glyphicon glyphicon-star' for='star4' title='Bueno'>4 stars</label>";
			publicacion +=								    "<input type='radio' class='star3' name='rating' value='3' /><label class='glyphicon glyphicon-star' for='star3' title='Regular'>3 stars</label>";
			publicacion +=								    "<input type='radio' class='star2' name='rating' value='2' /><label class='glyphicon glyphicon-star' for='star2' title='Malo'>2 stars</label>";
			publicacion +=								    "<input type='radio' class='star1' name='rating' value='1' /><label class='glyphicon glyphicon-star' for='star1' title='Muy malo'>1 star</label>";
			publicacion +=									"</fieldset>";
			publicacion +=								"</div>";
			publicacion +=							"</div>";
			publicacion +=                  "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
			publicacion +=                   "<span aria-hidden='true'>&times;</span>";
			publicacion +=                  "</button>";
			publicacion +=                "</div>";
			publicacion +=                "<div class='modal-body'>";
			publicacion +=                 	"<div class='articulo_multimedia'>";
			publicacion +=										"<a ><img class='publicacion_multimedia2' src='"+mydata[i].multimedia_url+"'></a>";
			publicacion +=									"</div>";
			publicacion +=                 	"<p>";
			publicacion +=                	mydata[i].texto_completo;
			publicacion +=                	"</p>";
			publicacion +=                  "<div class='articulo_barra_opciones'>";
			publicacion +=										"<ul class='social-network social-circle'>";
			publicacion +=											"<li><a href='index.html' class='icoRss' title='Rss'><i class='fa fa-rss'></i></a></li>";
			publicacion +=											"<li><a href='#' class='icoFacebook' title='Facebook'><i class='fa fa-facebook'></i></a></li>";
			publicacion +=											"<li><a href='#' class='icoTwitter' title='Twitter'><i class='fa fa-twitter'></i></a></li>";
			publicacion +=											"<li><a href='#' class='icoGoogle' title='Google +'><i class='fa fa-google-plus'></i></a></li>";
			publicacion +=											"<li><a href='#' class='icoLinkedin' title='Linkedin'><i class='fa fa-linkedin'></i></a></li>";
			publicacion +=										"</ul>";
			publicacion +=									"</div>";
			publicacion +=									"<hr />";



			publicacion +=										"<div class='row seccion_comentarios'>";
			publicacion +=											"<div class='comentario'>";
			publicacion +=												"<div class='col-sm-2'>";
			publicacion +=													"<div class='thumbnail'>";
			publicacion +=														"<img class='img-responsive user-photo' src='../static/images/avatar.png'>";
			publicacion +=													"</div>";
			publicacion +=												"</div>";
			publicacion +=												"<div class='col-sm-10'>";
			publicacion +=													"<div class='panel panel-default'>"	;												
			publicacion +=														"<div class='panel-body panel-heading comentar2'>";
			publicacion +=															"<textarea class='comentar3 form-control' rows='5' placeholder='Añade un comentario público'></textarea>";
			publicacion +=														"</div>";
			publicacion +=														"<div class='panel-footer'>";
			publicacion +=															"<button type='button' class='btn'>Cancelar</button>";
			publicacion +=															"<button type='button' class='btn btn-success'>Comentar</button>";
			publicacion +=														"</div>";
			publicacion +=													"</div>";
			publicacion +=												"</div>";
			publicacion +=											"</div>";
			publicacion +=											"<hr /> ";


			var comentarios_lenght = mydata[i].comentarios.length;
			for(j = 0; j<comentarios_lenght; j++){
				var comentarios = "";
				var tipo_principal = true;
				if(mydata[i].comentarios[j].tipo == "respuesta"){
					tipo_principal = false;
				}

				if(tipo_principal){
					comentarios = 				"<div class='comentario'>";				
				}else{
					comentarios = 				"<div class='comentario respuesta col-xs-11 col-sm-10 flotar_derecha'>";
				}
				comentarios +=						"<div class='col-sm-2'>	";
				comentarios +=							"<div class='thumbnail'>";
				comentarios +=								"<img class='img-responsive user-photo' src='"+mydata[i].comentarios[j].foto_perfil+"'>";
				comentarios +=							"</div>";
				comentarios +=						"</div>";
				comentarios +=						"<div class='col-sm-10'>";
				comentarios +=							"<div class='panel panel-default'>";
				comentarios +=								"<div class='panel-heading'>";
				comentarios +=									"<span> <strong>"+mydata[i].comentarios[j].nombre_usuario+" </strong>  <span class='text-muted'>comentó el "+mydata[i].comentarios[j].fecha_comentario+"</span></span>	"	;												
				comentarios +=								"</div>";
				comentarios +=								"<div class='panel-body'>";
				comentarios +=									"<p>";
				comentarios +=										 mydata[i].comentarios[j].texto;
				comentarios +=									"</p>";
				comentarios +=								"</div>";

				if(tipo_principal){
					comentarios +=								"<div class='panel-footer'>";
					comentarios +=									"<button type='button' class='btn btn-primary'>Responder</button>";
					comentarios +=								"</div>";
				}
				comentarios +=							"</div>";
				comentarios +=						"</div>";
				comentarios +=					"</div>";

				publicacion += comentarios;
			}
										
							
 publicacion +=               "</div> ";
 publicacion +=             "</div>";
 publicacion +=           "</div>";
 publicacion +=         "</div> ";













			$(publicacion).appendTo("#content");



		}

		//Agregamos el boton
		show_button(max,increment,max_value);
	}

}