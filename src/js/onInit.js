(function(){
    "use strict";
    var winObj=$(window);
    
    winObj.on("load",function(){
        var wScrollTop=$(window).scrollTop();
        
        if(wScrollTop>150){
            $("#pageHeader").addClass("shrink")}
        else{
            $("#pageHeader").removeClass("shrink")
        }

        winObj.on("scroll",function(){
            var wScrollTop=$(window).scrollTop();
            
            if(wScrollTop>150){
                $("#pageHeader").addClass("shrink")}
            else{
                $("#pageHeader").removeClass("shrink")
            }
        });
          
        $("body").scrollspy({target:".navbar-collapse",offset:70});                
        $(".nav a").on("click",function(){
            $("#myNavbar").removeClass("in").addClass("collapse")
        });

        $(".navbar-nav li a, .navbar-brand, .a-btn").on("click",function(e){
            var anchor=$(this);
            $("html, body").stop().animate({scrollTop:$(anchor.attr("href")).offset().top-60},1e3);
            e.preventDefault()
        });
        })
})();