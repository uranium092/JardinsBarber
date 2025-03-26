const { render } = require("ejs");
let express=require("express");
let router=express.Router();
const jwt=require("jsonwebtoken");
let moment=require("moment");
moment.locale("es",{
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  });

router.use((req,res,next)=>{ 
    if(req.url.includes("registrar") || req.url.includes("enviarCorreo")){
        return next();
    }
    if(req.cookies.id==undefined){
        return res.render("Usuario/AusenciaCookies");
    }
    if(req.cookies.rol=="admin"){
        return res.render("Admin/DenegadoOtroRol");
    }
    if(req.cookies.rol=="barbero"){
        return res.render("Barbero/DenegadoOtroRol");
    }

    next();
    
}); 

router.post("/registrar", (req, res)=>{
    fetch("http://3.144.244.103/usuario/insertarUsuario",{method:"POST", headers:{'Content-Type':"application/json"}, body:JSON.stringify(req.body)}).then( (response)=>{
        if(response.status==200){
            res.render("Usuario/ConfirmacionRegistro");
        }else{
            res.send("Error en el registro");
        }
    } );

}); 


router.get("/datosUsuario", (req, res)=>{
    fetch("http://3.144.244.103/usuario/obtenerCliente/"+req.cookies.id).then((e)=>{
        e.json().then((cuerpo)=>{
            res.render("Usuario/vistaDatosUsuario",{
                name_user:cuerpo.name_user,
                phone_user:cuerpo.phone_user,
                email_user:cuerpo.email_user,
                password_user:"*".repeat(cuerpo.password_user.length)
            })
        })
    });

})

router.get("/traerPassword", (req,res)=>{
    let id = req.cookies.id;
    fetch("http://3.144.244.103/usuario/obtenerCliente/"+id).then((e)=>{
        e.json().then((cuerpo)=>{
            console.log(cuerpo);
            res.render("Usuario/cambiarPassword",
                {
                    "id_user":req.cookies.id,
                    "name_user":cuerpo.name_user,
                    "phone_user":cuerpo.phone_user,
                    "email_user":cuerpo.email_user,
                    "password_user":cuerpo.password_user
                } 
                )
        })
    })
})

router.get("/actualizarDatos", (req, res)=>{
    let = id = req.cookies.id;
    fetch("http://3.144.244.103/usuario/obtenerCliente/"+id).then((e)=>{
        e.json().then((cuerpo)=>{
            res.render("Usuario/actualizarDatos",
                {
                    "id_user":req.cookies.id,
                    "name_user":cuerpo.name_user,
                    "phone_user":cuerpo.phone_user,
                    "email_user":cuerpo.email_user,
                    "password_user":cuerpo.password_user
                }
                )
        })
    })
});

router.get("/infoBarbero/:id", (req,res)=>{
    fetch("http://3.144.244.103/barbero/obtener/"+req.params.id).then((response)=>{
        if(response.status==404) return res.redirect("/index");
        response.json().then(body=>{
            res.render("Usuario/infoBarbero", {data:body});
        });
    }).catch(()=>{
        res.send("Ha ocurrido un error");
    });
});

router.post("/enviarCorreo",(req,res)=>{
    let tokenGenerated=jwt.sign(req.body,"faraday");
    req.body.name_user=req.body.name_user.toUpperCase();
    let bodyMessage = "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333;'><div style='text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;'><h1 style='margin: 0; color: rgb(239, 184, 16);'>Cambiar Contraseña</h1></div><div style='margin: 20px 0;'><p style='font-size: 16px; line-height: 1.6;'>Hola <span>"+req.body.name_user+"</span>,</p><p style='font-size: 16px; line-height: 1.6;'>Hemos recibido una solicitud para restablecer tu contraseña. Si no fuiste tú, puedes ignorar este correo.</p><p style='font-size: 16px; line-height: 1.6;'>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><a href='http://localhost:16000/recuperarContrasenaUsuario/"+tokenGenerated+"' style='display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: rgb(239, 184, 16); color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;'>Cambiar Contraseña</a></div><div style='text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999;'><p>&copy; Jardin's Barber. Todos los derechos reservados.</p></div></div>";
    
    fetch("http://3.144.244.103/usuario/enviarEmail", {headers:{'Content-Type':"application/json"}, method:"POST", body:JSON.stringify({to:req.body.email_user,subject:"Cambiar Contraseña",body:bodyMessage})}).then(resp=>{
        res.status(resp.status).end();
    }).catch(()=>{
        res.status(500).end();
    })
});

router.get("/verAgenda/:id", async(req,res)=>{
    let r=await fetch("http://3.144.244.103/cita/obtenerCitasPorUsuario/"+req.cookies.id);
    let b=await r.json();
    if(b.length>0) return res.redirect("/index");
    let key=req.params.id;
    let responseBarbero=await fetch("http://3.144.244.103/barbero/obtener/"+key);
    if(responseBarbero.status==404) return res.redirect("/index");
    let bodyBarbero=await responseBarbero.json();

    let responseCita=await fetch("http://3.144.244.103/cita/obtenerCitasPorBarbero/"+key);
    let bodyCita=await responseCita.json();
    let state=false;
    if(bodyCita.length>0){
        state=true;
        require("./Ghost")(bodyCita);
    }
   res.render("Usuario/verAgendaBarbero", {state:state, citas:bodyCita, barbero:bodyBarbero, idUserSession:req.cookies.id});

});

const parse=(data, start, end)=>{
    data.fecha=moment(start).format("dddd[, ]DD[ de ]MMMM");
    data.horaInicio=moment(start).format("h:mmA");
    data.horaFin=moment(end).format("h:mmA");
    return data;
};

router.get("/agendarCita/:idDate/:idUser", (req,res)=>{
    fetch("http://3.144.244.103/cita/agendar/"+req.params.idDate+"/"+req.params.idUser, {method:"POST"}).then(r=>{
        r.json().then(b=>{
            let content=parse({},b.inicioCita, b.finCita);
            fetch("http://3.144.244.103/usuario/enviarEmail", {method:"POST",headers:{'Content-Type':"application/json"}, body:JSON.stringify({to:b.usuario.email_user,subject:"Confirmación de cita",body:`<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333;'><div style='text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;'><h1 style='margin: 0; color: rgb(239, 184, 16);'>Confirmación de Cita</h1></div><div style='margin: 20px 0;'><p style='font-size: 16px; line-height: 1.6;'>Hola <span>${b.usuario.name_user}</span>,</p><p style='font-size: 16px; line-height: 1.6;'>¡Gracias por agendar tu cita en Jardin's Barber! Nos alegra confirmarte que tu cita ha sido programada con éxito.</p><p style='font-weight: bold; font-size: 16px; line-height: 1.6;'>Fecha: <span style= 'font-weight: normal;'>${content.fecha}</span></p><p style='font-weight: bold; font-size: 16px; line-height: 1.6;'>Hora Inicio: <span style= 'font-weight: normal;'>${content.horaInicio}</span></p><p style='font-weight: bold; font-size: 16px; line-height: 1.6;'>Hora Fin: <span style= 'font-weight: normal;'>${content.horaFin}</span></p><p style=' color: rgb(239, 184, 16); font-weight: bold; font-size: 24px; line-height: 1.6;'>Datos Barbero</p><p style='font-weight: bold; font-size: 16px; line-height: 1.6;'>Nombre: <span style= 'font-weight: normal;'>${b.barbero.nameBarber}</span></p><p style='font-weight: bold; font-size: 16px; line-height: 1.6;'>Telefono: <span style= 'font-weight: normal;'>${b.barbero.phoneBarber}</span></p><p style='font-weight: bold; font-size: 16px; line-height: 1.6;'>Correo: <span style= 'font-weight: normal;'>${b.barbero.emailBarber}</span></p></div><div style='text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999;'><p>&copy; Jardin's Barber. Todos los derechos reservados.</p></div></div>`})});
            res.redirect("/index");
        });
    });
});


module.exports=router;