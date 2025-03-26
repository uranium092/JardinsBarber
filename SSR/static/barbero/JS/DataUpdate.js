window.addEventListener('load', () => {
  let id_barber = document.getElementById('id_barber');
  let name_barber = document.getElementById('name_barber');
  let phone_barber = document.getElementById('phone_barber');
  let password_barber = document.getElementById('password_barber');
  let email_barber = document.getElementById('email_barber');
  let descripcion_barber = document.getElementById('description_barber');
  let role = document.querySelector('#role');
  let photo = document.querySelector('#file');

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let dcc = {
      idBarber: id_barber.value,
      nameBarber: name_barber.value,
      phoneBarber: phone_barber.value,
      emailBarber: email_barber.value,
      passwordBarber: password_barber.value,
      descriptionBarber: descripcion_barber.value,
      profilePicture: null,
      role: role.value,
    };

    if (photo.files.length == 0) {
      //Sin foto-archivo seleccionado
      fetch('http://localhost:8080/barbero/actualizarBarberoSinFoto', {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(dcc),
      }).finally(() => {
        document.location.href = '/barbero/datosBarbero';
      });
    } else {
      let multipart = new FormData();
      multipart.append('id', dcc.idBarber);
      multipart.append('nombre', dcc.nameBarber);
      multipart.append('numero', dcc.phoneBarber);
      multipart.append('correo', dcc.emailBarber);
      multipart.append('contrasena', dcc.passwordBarber);
      multipart.append('descripcion', dcc.descriptionBarber);
      multipart.append('foto', photo.files[0]);
      multipart.append('role', dcc.role);
      fetch('http://localhost:8080/barbero/actualizarBarberoConFoto', {
        method: 'PUT',
        body: multipart,
      }).finally(() => {
        document.location.href = '/barbero/datosBarbero';
      });
    }
  });
});
