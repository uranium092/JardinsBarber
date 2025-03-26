$(document).ready(function(){
    $(".dia").click(function(e){
        let source=e.target.dataset.key;
        loadNewDates(findDates(source,JSON.parse($("#everything").val())),source);
        $("#current").val(source);
    });
});

const findDates=(key,all)=>{
    for(let p=0;p<all.length;p++){
        if(all[p].fecha==key) return all[p].valores;
    }
};

const updateEvents=()=>{
    $(".agendar").click(function(e){
        e.preventDefault();
        fetch(this.href).then(response=>{
            if(response.status==200){
                socket.emit("agendar",$("#idBarber").val(),()=>{
                    window.location.href="/index";
                });
            }
        });
    });
};

const loadNewDates=(everything, title)=>{
    $(".agenda-container").html("");
    $(".tituloFecha").text(title);
    everything.forEach(d=>{
        let cita=document.createElement("div");
        cita.className="cita";
        let hora=document.createElement("div");
        hora.className="hora";
        hora.textContent=d.horaInicio+" - "+d.horaFin;
        let boton=document.createElement("button");
        boton.className="boton-agendar";
        let url=document.createElement("a");
        url.className="agendada";
        url.textContent="Agendada";
        if(!d.estadoCita){
            url.href="/usuario/agendarCita/"+d.idCita+"/"+$("#idUser").val();
            url.textContent="Agendar";
            url.className="agendar";
        }
        boton.appendChild(url);
        cita.appendChild(hora);
        cita.appendChild(boton);
        document.querySelector(".agenda-container").appendChild(cita);
    });
    updateEvents();
};