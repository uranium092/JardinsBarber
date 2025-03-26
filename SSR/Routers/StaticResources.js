let express=require("express");
let router=express.Router();
const jwt=require("jsonwebtoken");

router.get("/", (req, res)=>{
    res.redirect("/index");
});



router.get("/index", async(req, res)=>{


    if(req.cookies.id == undefined){
        res.sendFile(__dirname+"/static/pagInicio.html");
    }else{
        if(req.cookies.rol=="usuario"){
            let request=await fetch("http://3.144.244.103/barbero/obtenerTodos");
            let requestUsuario = await fetch("http://3.144.244.103/cita/obtenerCitasPorUsuario/"+req.cookies.id);
            let responseUsuario = await requestUsuario.json();
            let response=await request.json();
            res.render("Usuario/vistaUsuario",{data:response, dataUsuario:responseUsuario});
        } 
        else if(req.cookies.rol=="admin"){
            res.render("Admin/vistaAdmin");
        }
        else{
            let requestBarbero = await fetch("http://3.144.244.103/cita/obtenerCitasPorBarbero/"+req.cookies.id);
            let responseBarbero = await requestBarbero.json();
            res.render("Barbero/vistaBarbero",{dataBarbero:responseBarbero});
        }
    }
    
});



router.get("/loginUser", (req,res)=>{
    if(req.cookies.id==undefined){
        return res.sendFile(__dirname+"/static/LoginUsuario.html");
    }
    res.redirect("/index");
});

router.get("/vistaRecuperarUsuario",(req,res)=>{
    if(req.cookies.id==undefined){
        return res.render("Usuario/vistaRecuperacion");
    }
    res.redirect("/index");
});

router.get("/vistaRecuperarBarbero", (req,res)=>{
    if(req.cookies.id==undefined){
        return res.render("vistaRecuperacionBarberoAdmin");
    }
    res.redirect("/index");
});

router.get("/recuperarContrasenaUsuario/:token", (req,res)=>{
    let data=jwt.verify(req.params.token,"faraday");
    res.render("Usuario/RecuperarContrasena", {body:data});
});

router.get("/recuperarContrasenaBarbero/:token", (req,res)=>{
    let data=jwt.verify(req.params.token,"faraday");
    res.render("RecuperarContrasenaBarberoAdmin", {body:data});
});

router.get("/regUser", (req,res)=>{
    if(req.cookies.id==undefined){
        return res.sendFile(__dirname+"/static/register.html");
    }
    res.redirect("/index");
});

router.get("/loginBarber", (req,res)=>{
    if(req.cookies.id==undefined){
        return res.sendFile(__dirname+"/static/LoginBarber.html");
    }
    res.redirect("/index");
});

module.exports=router;

//localhost:16000/index
