// -----ADMINISTRADOR--------

const socket = io();

moment.locale('es', {
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
      '_'
    ),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
});

const parse = (citas) => {
  citas.forEach((info) => {
    info.fecha = moment(info.fecha).format('dddd[, ]DD[ de ]MMMM');
    info.valores.forEach((date) => {
      let start = moment(date.inicioCita);
      let end = moment(date.finCita);
      delete date.inicioCita;
      delete date.finCita;
      delete date.barbero;
      date.horaInicio = start.format('h:mmA');
      date.horaFin = end.format('h:mmA');
    });
  });
};

$(document).ready(function () {
  socket.on('refresh', (id) => {
    if (id == $('#idBarber').val()) {
      fetch('http://localhost:8080/cita/obtenerCitasPorBarbero/' + $('#idBarber').val()).then(
        (res) => {
          res.json().then((data) => {
            parse(data);
            $('#everything').val(JSON.stringify(data));
            loadNewDates(findDates($('#current').val(), data), $('#current').val());
          });
        }
      );
    }
  });
});
