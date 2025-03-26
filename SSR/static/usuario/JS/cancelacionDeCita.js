const socket=io();
window.addEventListener("load",()=>{
    document.querySelector("form").addEventListener("submit",(e)=>{
        e.preventDefault();
        let data=JSON.parse($("#body").val());
        data[0].usuario=null;
        data[0].estadoCita =false;
        
        fetch("http://3.144.244.103/cita/cancelarCita", {headers:{'Content-Type':"application/json"}, method:"PUT", body:JSON.stringify(data[0])}).then(ok=>{
            socket.emit("agendar",$("#idBarber").val(), ()=>{
                window.location.reload();
            });
        });

    })
})