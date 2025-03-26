window.addEventListener("load",()=>{
    $(".item-barber").click(function(e){    
        document.location.href="/usuario/infoBarbero/"+e.target.dataset.key;
    });
},false);