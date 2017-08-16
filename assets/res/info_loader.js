var info_loader = (function(link, display_window, content){
  function toggle(){
    $(display_window).animate({'opacity':'0'}, on);
  }

  function on(){
    $('html, body').animate({
     'scrollTop': $(display_window).offset().top - 100
    });

    display_window.innerHTML=content  + '<h6>(Click to close)</h6>';
    $(display_window).animate({'opacity':'1'});
    $(display_window).css({'z-index':'0'});
  }

  function off(){
    $(display_window).animate({'opacity':'0'});
    $(display_window).css({'z-index':'-1'});
  }

  $(link).click(toggle);
  $(display_window).click(off);
});
