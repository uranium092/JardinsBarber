window.addEventListener("load",()=>{
    let id_user = document.getElementById("id_user");
    let name_user = document.getElementById("name_user");
    let phone_user  = document.getElementById("phone_user");
    let password_user = document.getElementById("password_user");
    let password_user_confirm = document.getElementById("password_user_confirm");
    
    document.querySelector("form").addEventListener("submit",(e)=>{
        e.preventDefault();
        if(password_user.value==password_user_confirm.value && password_user.value.length>0 && password_user_confirm.value.length>0){
            let dcc = {
                "id_user":id_user.value,
                "name_user":name_user.value,
                "phone_user":phone_user.value,
                "email_user":email_user.value,
                "password_user": password_user.value
            }
            fetch("http://3.144.244.103/usuario/actualizar",{method:"PUT", headers:{'Content-Type':"application/json"}, body:JSON.stringify(dcc)}).then( (response)=>{
                document.location.href="/usuario/datosUsuario";
            })
        }else{
            alert("Lo siento los datos estan erroneos")
        }
        
    })
})
