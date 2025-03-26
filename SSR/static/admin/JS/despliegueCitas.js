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
    $(".detail-date").click(function(e){
        if(e.target.className.includes("detail-date")) $(e.target).next().slideToggle(300);
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
        hora.disabled=true;
        cita.appendChild(hora);
        if(d.estadoCita){
            cita.className="cita detail-date";
            let txt=document.createElement("span");
            txt.textContent="Agendada";
            cita.appendChild(txt);
            let divData=document.createElement("div");
            divData.className="container-detail";
            divData.innerHTML=`<h1>Detalles de usuario</h1> 
            <div class="conte-datos"><label>Nombre:</label><input type="text" disabled id="nombreUsuario" value="${d.usuario.name_user}"> </div><div class="conte-datos"> <label>Telefono:</label><input type="text" disabled id="telefonoUsuario" value="${d.usuario.phone_user}" </div><div class="conte-datos"> <label>Correo:</label> <input type="text" disabled id="correoUsuario" value="${d.usuario.email_user}"</div>`;
            document.querySelector(".agenda-container").appendChild(cita);
            document.querySelector(".agenda-container").appendChild(divData);
        }else{
            let txt=document.createElement("span");
            txt.textContent="Sin Agendar";
            cita.appendChild(txt);
            document.querySelector(".agenda-container").appendChild(cita);
        }
    });
    updateEvents();
};
