let moment=require("moment");
moment.locale("es");

const parse= (citas)=>{
    citas.forEach(info=>{
        info.fecha=moment(info.fecha).format("dddd[, ]DD[ de ]MMMM");
        info.valores.forEach(date=>{
            let start=moment(date.inicioCita);
            let end=moment(date.finCita);
            delete date.inicioCita; delete date.finCita; delete date.barbero; delete date.usuario;
            date.horaInicio=start.format("h:mmA");
            date.horaFin=end.format("h:mmA");
        });
    });
};

module.exports=parse;