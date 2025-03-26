window.addEventListener('load', () => {
  let idBarber = document.getElementById('idBarber');
  let nameBarber = document.getElementById('nameBarber');
  let phoneBarber = document.getElementById('phoneBarber');
  let emailBarber = document.getElementById('emailBarber');
  let descriptionBarber = document.getElementById('descriptionBarber');
  let profilePicture = document.getElementById('profilePicture');
  let role = document.getElementById('role');
  let passwordBarber = document.getElementById('passwordBarber');
  let passwordBarberConfirm = document.getElementById('passwordBarberConfirm');

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (
      passwordBarber.value == passwordBarberConfirm.value &&
      passwordBarber.value.length > 0 &&
      passwordBarberConfirm.value.length > 0
    ) {
      let dcc = {
        idBarber: idBarber.value,
        nameBarber: nameBarber.value,
        phoneBarber: phoneBarber.value,
        emailBarber: emailBarber.value,
        descriptionBarber: descriptionBarber.value,
        profilePicture: profilePicture.value,
        role: role.value,
        passwordBarber: passwordBarber.value,
      };
      fetch('http://localhost:8080/barbero/actualizarBarberoSinFoto', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dcc),
      }).then((response) => {
        document.location.href = '/barbero/datosBarbero';
      });
      console.log(dcc);
    } else {
      $('#message').text('Las contraseñas no coinciden');
    }
  });
});
