document.querySelector('form').addEventListener(
  'submit',
  (e) => {
    e.preventDefault();

    let identificador = document.querySelector('#id').value;

    let timeInicio = document.querySelector('#timeInicio').value;
    let fechaInicio = document.querySelector('#inicio').value;

    let arrayAnioMesDiaInicio = fechaInicio.split('-');
    let arrayHoraMinutoInicio = timeInicio.split(':');

    let timeFin = document.querySelector('#timeFin').value;
    let fechaFin = document.querySelector('#fin').value;

    let arrayAnioMesDiaFin = fechaFin.split('-');
    let arrayHoraMinutoFin = timeFin.split(':');

    let diccionario = {
      inicio: {
        anio: parseInt(arrayAnioMesDiaInicio[0]),
        mes: parseInt(arrayAnioMesDiaInicio[1]),
        dia: parseInt(arrayAnioMesDiaInicio[2]),
        hora: parseInt(arrayHoraMinutoInicio[0]),
        minuto: parseInt(arrayHoraMinutoInicio[1]),
      },
      fin: {
        anio: parseInt(arrayAnioMesDiaFin[0]),
        mes: parseInt(arrayAnioMesDiaFin[1]),
        dia: parseInt(arrayAnioMesDiaFin[2]),
        hora: parseInt(arrayHoraMinutoFin[0]),
        minuto: parseInt(arrayHoraMinutoFin[1]),
      },
      identificador: {
        id: identificador,
      },
    };
    fetch('http://localhost:8080/cita/agregarAgenda', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(diccionario),
    }).then((respuesta) => {
      window.location.href = '/index';
    });
  },
  false
);
