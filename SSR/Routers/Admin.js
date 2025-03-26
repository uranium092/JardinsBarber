let router = require('express').Router();

router.use((req, res, next) => {
  if (req.cookies.id == undefined) {
    return res.render('Admin/AusenciaCookies');
  }
  if (req.cookies.rol == 'usuario') {
    return res.render('Usuario/DenegadoOtroRol');
  }
  if (req.cookies.rol == 'barbero') {
    return res.render('Barbero/DenegadoOtroRol');
  }

  next();
});

router.get('/datosAdmin', async (req, res) => {
  let request = await fetch('http://localhost:8080/barbero/obtener/' + req.cookies.id);
  let body = await request.json();
  res.render('Admin/vistaDatosAdmin', { data: body });
});

router.get('/barberos', async (req, res) => {
  let response = await fetch('http://localhost:8080/barbero/obtenerTodos');
  let body = await response.json();
  res.render('Admin/Barberos', { data: body, id: req.cookies.id });
});

router.get('/agregarBarbero', (req, res) => {
  res.render('Admin/AgregarBarbero');
});

router.post('/registrarBarbero', (req, res) => {
  console.log(req.body);
  res.send('Registrado');
});

router.get('/actualizarDatosAdmin', async (req, res) => {
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
  res.render('Admin/actualizarDatosAdmin', data);
});

router.get('/actualizarpassword', (req, res) => {
  fetch('http://localhost:8080/barbero/obtener/' + req.cookies.id).then((e) => {
    e.json().then((cuerpo) => {
      console.log(cuerpo);
      res.render('Admin/actualizarpassword', {
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

router.get('/definirAgenda', (req, res) => {
  let id = req.cookies.id;
  let objeto = {
    id: id,
  };
  res.render('Admin/agenda', { objeto });
});

router.get('/infoBarbero/:id', async (req, res) => {
  let key = req.params.id;
  try {
    let response = await fetch('http://localhost:8080/barbero/obtener/' + key);
    if (response.status == 404) return res.redirect('/index');
    let data = await response.json();
    res.render('Admin/infoBarbero', { data: data });
  } catch (e) {
    res.end('Ha ocurrido un error -> ' + e.message);
  }
});

router.get('/verAgenda', async (req, res) => {
  let requestBarbero = await fetch(
    'http://localhost:8080/cita/obtenerCitasPorBarbero/' + req.cookies.id
  );
  let responseBarbero = await requestBarbero.json();
  if (responseBarbero == '') return res.redirect('/admin/definirAgenda');
  require('./Ghost')(responseBarbero);
  res.render('Admin/renderizacionAgenda', { data: responseBarbero, currentBarber: req.cookies.id });
});

module.exports = router;
