$(document).ready(function(){
    $(".watch").click(function(e){
        document.location.href="/admin/infoBarbero/"+e.target.dataset.key;
    });
    $(".delete").click(function(e){
        let action=confirm("Se eliminará a "+e.target.dataset.name.toUpperCase()+". ¿Estás Seguro?");
        if(action){
            fetch("http://3.144.244.103/cita/datosCitaPorBarbero/"+e.target.dataset.key).then(res=>{
                res.json().then(bodyResponse=>{
                    let recipients=[];
                    bodyResponse.forEach(el=>{
                        if(el.usuario!=null) recipients.push(el.usuario.email_user);
                    });
                    fetch("http://3.144.244.103/barbero/eliminar/"+e.target.dataset.key, {method:"DELETE"}).finally(()=>{
                        window.location.reload();
                    });
                    if(recipients.length>0){
                        fetch("http://3.144.244.103/barbero/notificarDespido",{headers:{'Content-Type':"application/json"},body:JSON.stringify({to:recipients,subject:"Cancelación de tu Cita en Jardin's Barber",bodyMessage:`<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333;'><div style='text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;'><h1 style='margin: 0; color: rgb(239, 184, 16);'>Cancelación de tu Cita en Jardin's Barber</h1></div><div style='margin: 20px 0;'><p style='font-size: 16px; line-height: 1.6;'>Hola,</p><p style='font-size: 16px; line-height: 1.6;'>Hemos detectado que proximamente tienes una cita con ${bodyResponse[0].barbero.nameBarber}; Queremos informarte que ya no forma parte de nuestro equipo. Si lo deseas, puedes reservar una cita con otro de nuestros barberos.</p><p style='font-size: 16px; line-height: 1.6;'>Lamentamos cualquier inconveniente que esto pueda causar y te aseguramos que recibirás el mismo servicio de calidad que esperas de nosotros.</p><p style='font-size: 16px; line-height: 1.6;'>Gracias por tu comprensión.</p></div> <div style='text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999;'><p>&copy; Jardin's Barber. Todos los derechos reservados.</p></div></div>`}),method:"POST"});
                    }
                });
            });
        }
    });
});