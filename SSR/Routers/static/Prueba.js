fetch("http://localhost:8080/usuario/traerTodo").then( (response)=>{
    if(response.status==400){
        alert("ERROR");
    }else{
        response.json((cuerpo)=>{
            console.log(cuerpo);
        })
    }
});