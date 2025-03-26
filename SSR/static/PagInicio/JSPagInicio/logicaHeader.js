
    $(document).ready(function(){
        console.log(document.getElementsByClassName("seccionScroll")[2].offsetTop);

        console.log(document.getElementById("nosotros").offsetTop);
       
        gestionarScrollHeader();
        eventoScrollPag();
    });
function gestionarScrollHeader(){
    window.addEventListener("scroll",function(event){
        if(window.scrollY!=0){
            $("header").css("height","24px");
            $("header").css("background-color","rgba(0,0,0,0.6)");
        }else{
            $("header").css("height","56px");
            $("header").css("background-color","rgba(0,0,0,0.8)");
        }
        
    },false);
}
function eventoScrollPag(){
    let items=$(".itemScroll");
    let pxScroll=[0];
    cargarPX(pxScroll);
    $(".itemScroll").each(function(){
        $(this).click(function(obj){ 
            for(let x=0;x<items.length;x++){
                if(items[x]==obj.target) programarScroll(pxScroll[x]);
            }
        });
    });
    
}
function cargarPX(px){
    let posicionPx=1;
    $(".seccionScroll").each(function(){
        px[posicionPx]=Math.round($(this).offset().top);
        Math.round($(this).offset().top);
        posicionPx++;
    });
}
function programarScroll(px){
    window.scroll(0,px);
}