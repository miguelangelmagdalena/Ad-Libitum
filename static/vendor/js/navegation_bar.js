    
    $(".row-list ul li").click(function(){
      
      $(".row-list ul li").css("background","transparent");
      if($(this).hasClass("close-session")){
        $(this).css("background","transparent");
      }
      else{
      $(this).css("background","#004ea1");
      }

    });