$(document).ready(function(){
    gestionarMenu();
});
function gestionarMenu(){
    $("#menuDesplegable").hover(function(){
        $("#menuDesplegable div").stop().slideToggle(320);
    },function(){
        $("#menuDesplegable div").stop().slideToggle(320);
    });
}