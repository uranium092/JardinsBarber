$(document).ready(function () {
  $('form').submit(function (e) {
    e.preventDefault();
    if ($('#campoCorreo').val().length == 0 || $('#campoContrasena').val().length == 0) {
      $('#message').text('Completar todos los campos');
      return;
    }
    fetch(
      'http://localhost:8080/barbero/existencia/' +
        $('#campoCorreo').val() +
        '/' +
        $('#campoContrasena').val()
    ).then((response) => {
      if (response.status == 404) {
        $('#message').text('Los datos son erroneos');
        return;
      }
      response.json().then((body) => {
        fetch('/registrarCookie/' + body[0].idBarber + '/' + body[0].role).finally(() => {
          document.location.href = '/index';
        });
      });
    });
  });
});
