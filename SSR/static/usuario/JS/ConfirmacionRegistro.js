window.addEventListener( "load",()=>{
    let counter=document.getElementById("counter");
    let interval=setInterval(()=>{
       if(parseInt(counter.innerText)==0){
            window.clearInterval(interval);
            document.location.href="/index";
       }else{
            counter.innerText=parseInt(counter.innerText)-1;
       }
    },1000);
},false );