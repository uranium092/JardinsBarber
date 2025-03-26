$(document).ready(function () {
  $('form').submit(function (e) {
    e.preventDefault();
    if ($('#contra').val().length == 0 || $('#confirm').val().length == 0) {
      return $('.info').text('Completar todos los campos');
    }
    if ($('#contra').val() != $('#confirm').val()) {
      return $('.info').text('Las contraseñas no coinciden');
    }

    let data = JSON.parse($('#body').val());
    data.password_user = $('#contra').val();
    fetch('http://localhost:8080/usuario/actualizar', {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(data),
    }).then((ok) => {
      runMessageOk(data.email_user);
    });
  });
});

const runMessageOk = (email) => {
  fetch('http://localhost:8080/usuario/enviarEmail', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      to: email,
      subject: 'Cambio de Contraseña Exitoso',
      body: "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333;'><div style='text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;'><h1 style='margin: 0; color: rgb(239, 184, 16);'>Cambio de Contraseña Exitoso</h1></div><div style='margin: 20px 0;'><p style='font-size: 16px; line-height: 1.6;'>Tu contraseña ha sido cambiada exitosamente. Si tú realizaste esta acción, no es necesario que tomes más medidas.</p><p style='font-size: 16px; line-height: 1.6;'>Si no fuiste tú quien solicitó este cambio, por favor, contacta a nuestro soporte de inmediato.</p></div> <div style='text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999;'><p>&copy; Jardin's Barber. Todos los derechos reservados.</p></div></div>",
    }),
  });
  $('.info').text('¡Contraseña cambiada!');
  setTimeout(() => {
    recursive($('.info').text().length - 1);
  }, 1000);
};

const recursive = (index) => {
  $('.info').text($('.info').text().substring(0, index));
  if (index > 0)
    setTimeout(() => {
      recursive(index - 1);
    }, 100);
  else window.close();
};
