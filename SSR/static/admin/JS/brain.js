$(document).ready(function () {
  $('form').submit(function (e) {
    e.preventDefault();
    let body = {
      nameBarber: $('#name').val(),
      phoneBarber: $('#phone').val(),
      emailBarber: $('#email').val(),
      passwordBarber: $('#pass').val(),
      descriptionBarber: $('#description').val(),
      profilePicture: '',
      role: 'barbero',
    };
    if (document.querySelector('#photo').files.length == 0) {
      body.profilePicture = '';
      fetch('http://localhost:8080/barbero/insertarBarberoSinFoto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).finally(async () => {
        try {
          await fetch('/admin/actualizarBanco/in/w', { method: 'POST' });
        } finally {
          document.location.href = '/admin/barberos';
        }
      });
    } else {
      body.profilePicture = document.querySelector('#photo').files[0];
      let multipart = new FormData();
      multipart.append('nombre', body.nameBarber);
      multipart.append('numero', body.phoneBarber);
      multipart.append('correo', body.emailBarber);
      multipart.append('contrasena', body.passwordBarber);
      multipart.append('descripcion', body.descriptionBarber);
      multipart.append('foto', body.profilePicture);
      fetch('http://localhost:8080/barbero/insertarBarberoConFoto', {
        method: 'POST',
        body: multipart,
      }).finally(async () => {
        document.location.href = '/admin/barberos';
      });
    }
  });
});
