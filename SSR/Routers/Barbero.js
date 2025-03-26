let router = require('express').Router();
let jwt = require('jsonwebtoken');

router.use(async (req, res, next) => {
  if (req.url.includes('enviarCorreo')) {
    return next();
  }
  if (req.cookies.id == undefined) {
    return res.render('Barbero/AusenciaCookies');
  }
  if (req.cookies.rol == 'admin') {
    return res.render('Admin/DenegadoOtroRol');
  }
  if (req.cookies.rol == 'usuario') {
    return res.render('Usuario/DenegadoOtroRol');
  }

  let response = await fetch('http://localhost:8080/barbero/obtener/' + req.cookies.id);
  if (response.status == 404) return res.redirect('/borrarCookies');

  next();
});

router.post('/enviarCorreo', async (req, res) => {
  let token = jwt.sign(req.body, 'faraday');
  req.body.nameBarber = req.body.nameBarber.toUpperCase();
  let bodyMessage =
    "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333;'><div style='text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;'><h1 style='margin: 0; color: rgb(239, 184, 16);'>Cambiar Contraseña</h1></div><div style='margin: 20px 0;'><p style='font-size: 16px; line-height: 1.6;'>Hola <span>" +
    req.body.nameBarber +
    "</span>,</p><p style='font-size: 16px; line-height: 1.6;'>Hemos recibido una solicitud para restablecer tu contraseña. Si no fuiste tú, puedes ignorar este correo.</p><p style='font-size: 16px; line-height: 1.6;'>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><a href='http://localhost:16000/recuperarContrasenaBarbero/" +
    token +
    "' style='display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: rgb(239, 184, 16); color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;'>Cambiar Contraseña</a></div><div style='text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999;'><p>&copy; Jardin's Barber. Todos los derechos reservados.</p></div></div>";
  try {
    let response = await fetch('http://localhost:8080/barbero/enviarEmail', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        to: req.body.emailBarber,
        subject: 'Cambiar Contraseña',
        body: bodyMessage,
      }),
    });
    res.status(response.status).end();
  } catch (e) {
    res.status(500).end('Algo salió mal :-(  --> ' + e.message);
  }
});

router.get('/agendaCreadaBarbero', (req, res) => {
  res.render('admin/alertaAgendaCreada');
});

router.get('/datosBarbero', async (req, res) => {
  let request = await fetch('http://localhost:8080/barbero/obtener/' + req.cookies.id);
  let body = await request.json();
  res.render('Barbero/vistaDatosBarbero', { data: body });
});

/*nose*/
router.get('/picha', (req, res) => {
  console.log(req.cookies);
});

router.get('/cambiar', (req, res) => {
  let id = req.cookies.id;
  fetch('http://localhost:8080/barbero/obtener/' + id).then((e) => {
    e.json().then((cuerpo) => {
      res.render('Barbero/cambiarPassword', {
        idBarber: req.cookies.id,
        nameBarber: cuerpo.nameBarber,
        phoneBarber: cuerpo.phoneBarber,
        emailBarber: cuerpo.emailBarber,
        passwordBarber: cuerpo.passwordBarber,
        descriptionBarber: cuerpo.descriptionBarber,
        profilePicture: cuerpo.profilePicture,
        role: cuerpo.role,
      });
    });
  });
});

router.get('/actualizarDatosBarbero', async (req, res) => {
  let request = await fetch('http://localhost:8080/barbero/obtener/' + req.cookies.id);
  let response = await request.json();
  if (response.profilePicture == '') {
    response.profilePicture = 'http://localhost:8080/images/same/profile.png';
  } else {
    response.profilePicture =
      'http://localhost:8080/images/' + response.idBarber + '/' + response.profilePicture;
  }
  let data = {
    id_barber: response.idBarber,
    name_barber: response.nameBarber,
    phone_barber: response.phoneBarber,
    email_barber: response.emailBarber,
    description: response.descriptionBarber,
    urlImage: response.profilePicture,
    another: response,
  };
  res.render('Barbero/actualizarDatosBarbero', data);
});

router.get('/definirAgenda', (req, res) => {
  let id = req.cookies.id;
  let objeto = {
    id: id,
  };
  res.render('Barbero/agenda', { objeto });
});

router.get('/verAgenda', async (req, res) => {
  let requestBarbero = await fetch(
    'http://localhost:8080/cita/obtenerCitasPorBarbero/' + req.cookies.id
  );
  let responseBarbero = await requestBarbero.json();
  if (responseBarbero == '') return res.redirect('/barbero/definirAgenda');
  require('./Ghost')(responseBarbero);
  res.render('Barbero/renderizacionAgenda', {
    data: responseBarbero,
    currentBarber: req.cookies.id,
  });
});

module.exports = router;
