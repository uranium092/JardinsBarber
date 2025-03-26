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
        fetch('http://localhost:8080/usuario/traerTodo').then((response) => {
          response.json().then((body) => {
            let boolean = false;
            let key = 0;
            body.forEach((element) => {
              if (element.email_user == inp1.value && element.password_user == inp2.value) {
                boolean = true;
                key = element.id_user;
              }
            });
            if (boolean == true) {
              fetch('/registrarCookie/' + key + '/usuario').finally(() => {
                document.location.href = '/index';
              });
            } else {
              $('#message').text('Los datos son erroneos');
            }
          });
        });
      },
      false
    );
  },
  false
);
