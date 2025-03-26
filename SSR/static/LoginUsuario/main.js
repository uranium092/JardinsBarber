window.addEventListener(
  'load',
  () => {
    let inp1 = document.getElementById('campoCorreo');
    let inp2 = document.getElementById('campoContrasena');

    document.querySelector('form').addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        if (inp1.value == '' || inp2.value == '')
          return $('#message').text('Completar todos los campos');
        fetch('http://localhost:8080/usuario/existencia/' + inp1.value + '/' + inp2.value).then(
          (response) => {
            if (response.status == 404) {
              $('#message').text('Los datos son erroneos');
              return;
            }
            response.json().then((body) => {
              fetch('/registrarCookie/' + body.id_user + '/usuario').finally(() => {
                document.location.href = '/index';
              });
            });
          }
        );
      },
      false
    );
  },
  false
);
