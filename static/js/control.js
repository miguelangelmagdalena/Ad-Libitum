$(document).ready(function(){//Cuando cargan todos los elementos del DOM

	//1. Mostramos la información dinamicamente desde el json
	var i = 0;			//Valor Inicial
	var max_value = 4; //Cantidad de elementos maxima en el json 
	var increment = 2;	//Cantidad de elementos a mostrar hasta llegar al maximo
	more_elements_callback(i,increment,max_value);

	//Evento de ver más al hacer scroll
	$(window).scroll(function(){
		var windowHeight = $(window).scrollTop();
		var windowHeight2 = $(window).height();
		var documentHeight = $(document).height();
		//var contentTarget = $("#Superbutton").offset().top;
 		//console.log(windowHeight + "px / boton: " + contentTarget + "px");
		//console.log(windowHeight + "px / height: " + windowHeight2 + "px / altura " + documentHeight + "px");
		if((windowHeight + windowHeight2) >= documentHeight  ){
			$("#Superbutton").click();	
		}
	});


});


/*****************OTRAS FUNCIONES********************************/


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


			
			var publicacion = "	<div class='publicacion shadow border_radius'>";
			publicacion +=			"<div class='publicacion2'>";
			publicacion +=				"<div class='publicacion_barra_nombre'>";				
			publicacion +=					"<a href=''>";
			publicacion +=						"<img class='publicacion_foto_miniatura' src='"+mydata[i].foto_perfil+"'> ";
			publicacion +=					"</a>";
			publicacion +=					"<div class='publicacion_nombre '>";
			publicacion +=						"<a href=''>"
			publicacion +=							"<h2 class='publicacion_nombre2 titulo'>"+mydata[i].nombre_usuario+"</h2>";
			publicacion +=						"</a>";					
			publicacion +=					"</div>";
			publicacion +=					"<button href='' class='publicacion_submenu_control_button'>";
			publicacion +=						"<h2 class='publicacion_submenu_control titulo'>☰</h2>";
			publicacion +=					"</button>";
			publicacion +=				"</div>";
			publicacion +=				"<div class='publicacion_barra_texto'>";
			publicacion +=					"<p class='publicacion_texto'>";
			publicacion +=						mydata[i].texto;
			publicacion +=					"</p>";
			publicacion +=					"<div class='publicacion_multimedia'>";
			publicacion +=						"<a href=''>";
			publicacion +=							"<img class='publicacion_multimedia2' src='"+mydata[i].multimedia_url+"'>";
			publicacion +=						"</a>";
			publicacion +=					"</div>";
			publicacion +=				"</div>";
			publicacion +=				"<!-- Barra de opciones de publicacion y comentario -->";
			publicacion +=				"<div class='publicacion_barra_opciones'>";
			publicacion +=					"<div class='publicacion_opciones flotar_derecha'>";
			publicacion +=						"<button class='publicacion_opciones_button'>";
			publicacion +=							"<img class='publicacion_icon' src='../static/images/icon-comentar.png'>" ;
			
			var comentarios_length = mydata[i].comentarios.length;
			publicacion +=							"<span class='publicacion_opciones_texto comentario_font'>"+comentarios_length+"</span>";
			publicacion +=						"</button>";
			publicacion +=					"</div>";												
			publicacion +=					"<div class='publicacion_opciones flotar_derecha'>";
			publicacion +=						"<button class='publicacion_opciones_button'>";
			publicacion +=							"<img class='publicacion_icon' src='../static/images/icon-nomegusta.png'>"; 
			publicacion +=							"<span class='publicacion_opciones_texto comentario_font'>"+mydata[i].cant_dislike+" |</span>";
			publicacion +=						"</button>";
			publicacion +=					"</div>";
			publicacion +=					"<div class='publicacion_opciones flotar_derecha'>";
			publicacion +=						"<button class='publicacion_opciones_button'>";
			publicacion +=							"<img class='publicacion_icon' src='../static/images/icon-megusta.png'> ";
			publicacion +=							"<span class='publicacion_opciones_texto comentario_font'>"+mydata[i].cant_like+" |</span>";
			publicacion +=						"</button>";
			publicacion +=					"</div>";
			publicacion +=					"<div class='publicacion_visto flotar_derecha'>";
			publicacion +=							"<img class='publicacion_visto2' src='../static/images/icon-visto.png'> ";
			publicacion +=							"<span class='publicacion_visto3 comentario_font'>"+mydata[i].cant_visualizaciones+" Visto</span>";
			publicacion +=					"</div>";
			publicacion +=					"<div class='publicacion_barra_opciones2'>";
			publicacion +=						"<div class='fecha1 flotar_izquierda'>"+mydata[i].fecha_creacion+"</div>";
			publicacion +=						"<div class='fecha2 flotar_izquierda'>(editado "+mydata[i].fecha_modificacion+")</div>";												
			publicacion +=					"</div>";
			publicacion +=				"</div>";

			if(comentarios_length != 0){
				publicacion +=				"<div class='seccion_comentarios'>";
				for (j = 0; j < comentarios_length; j++) {
					
					var comentarios = "";
					var aux1 = "";
					var aux2 = "comentarios_foto_miniatura2";


					if(mydata[i].comentarios[j].id_comentario_principal != -1){
						aux1 = "comentarios_respuesta";
						aux2 = "comentarios_foto_miniatura3";

					} 
					
					comentarios +=				"<div class='seccion_comentarios2 "+aux1+"'>";
					comentarios +=					"<div class='publicacion_barra_nombre'>";				
					comentarios +=						"<a href=''>";
					comentarios +=							"<img class='publicacion_foto_miniatura "+aux2+"' src='"+mydata[i].comentarios[j].foto_perfil+"'> ";
					comentarios +=						"</a>";
					comentarios +=						"<div class='publicacion_nombre '>";
					comentarios +=							"<a href=''>";
					comentarios +=								"<h2 class='publicacion_nombre2 titulo2'>"+mydata[i].comentarios[j].nombre_usuario+"</h2>";
					comentarios +=							"</a>";
					comentarios +=						"</div>";
					comentarios +=					"</div>";
					comentarios +=					"<div class='publicacion_barra_texto margin3'>";
					comentarios +=						"<p class='publicacion_texto'>";
					comentarios +=							mydata[i].comentarios[j].texto;
					comentarios +=						"</p>";
					comentarios +=					"</div>";
					comentarios +=					"<!-- Barra de opciones de publicacion y comentario -->";
					comentarios +=					"<div class='publicacion_barra_opciones'>";
					comentarios +=						"<div class='publicacion_opciones flotar_derecha'>";
					comentarios +=							"<button class='publicacion_opciones_button'>";
					comentarios +=								"<img class='publicacion_icon' src='../static/images/icon-comentar.png'>" ;
					comentarios +=								"<span class='publicacion_opciones_texto comentario_font'>"+mydata[i].comentarios[j].respuestas+"</span>";
					comentarios +=							"</button>";
					comentarios +=						"</div>	";
					comentarios +=						"<div class='publicacion_opciones flotar_derecha'>";
					comentarios +=							"<button class='publicacion_opciones_button'>";
					comentarios +=								"<img class='publicacion_icon' src='../static/images/icon-nomegusta.png'>" ;
					comentarios +=								"<span class='publicacion_opciones_texto comentario_font'>"+mydata[i].comentarios[j].cant_dislike+" |</span>";
					comentarios +=							"</button>";
					comentarios +=						"</div>";
					comentarios +=						"<div class='publicacion_opciones flotar_derecha'>";
					comentarios +=							"<button class='publicacion_opciones_button'>";
					comentarios +=								"<img class='publicacion_icon' src='../static/images/icon-megusta.png'>" ;
					comentarios +=								"<span class='publicacion_opciones_texto comentario_font'>"+mydata[i].comentarios[j].cant_like+" |</span>";
					comentarios +=							"</button>";
					comentarios +=						"</div>";
					comentarios +=						"<div class='publicacion_barra_opciones2'>";
					comentarios +=							"<div class='fecha1 flotar_izquierda'>"+mydata[i].comentarios[j].fecha_creacion+"</div>";											
					comentarios +=						"</div>";
					comentarios +=					"</div>";
					comentarios +=				"</div>";			
					publicacion += comentarios;
				}
				publicacion +=				"</div>";
			}

			publicacion +=			"</div>";
			publicacion +=		"</div>";

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