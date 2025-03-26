package com.faraday.project.controlador;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faraday.project.entidades.Barbero;
import com.faraday.project.entidades.Cita;
import com.faraday.project.entidades.Usuario;
import com.faraday.project.services.ServicioBarbero;
import com.faraday.project.services.ServicioCita;
import com.faraday.project.services.ServicioUsuario;

import Group.GrouperData;
import MailManager.SendMail;

@RestController
@RequestMapping("/cita")
@CrossOrigin


public class ControladorCitas {
	
	private GrouperData group=new GrouperData();
	
	@Autowired
	private ServicioBarbero servicioBarbero;
	
	@Autowired
	private ServicioCita serviciocita;
	
	@Autowired ServicioUsuario servicioUsuario;
	
	@PostMapping("/agregarAgenda")
	public ResponseEntity<?> agregarAgenda(@RequestBody HashMap<String, HashMap<String,Integer>> agenda){
		
		
		//ID BARBERO
		int id = agenda.get("identificador").get("id");
		
		//FECHA INICIO
		int anioInicio =  agenda.get("inicio").get("anio");
		int mesInicio=  agenda.get("inicio").get("mes");
		int diaInicio=  agenda.get("inicio").get("dia");
		int horaInicio=  agenda.get("inicio").get("hora");
		int minutoInicio=  agenda.get("inicio").get("minuto");
		
		
		//FECHA FIN
		int anioFin =  agenda.get("fin").get("anio");
		int mesFin=  agenda.get("fin").get("mes");
		int diaFin=  agenda.get("fin").get("dia");
		int horaFin=  agenda.get("fin").get("hora");
		int minutoFin=  agenda.get("fin").get("minuto");

		System.out.println(anioInicio);
		
		LocalDateTime start=LocalDateTime.of(anioInicio,mesInicio,diaInicio,horaInicio,minutoInicio); 
		LocalDateTime end=LocalDateTime.of(anioFin,mesFin,diaFin,horaFin,minutoFin); 
		
		LocalDateTime date=LocalDateTime.of(anioInicio,mesInicio,diaInicio,horaInicio,minutoInicio); 
		DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		
		
	       ArrayList<Object> lista = new ArrayList<>();
	       	       
	       
	      int tiki = 0; 
		
		while(date.compareTo(end)<0) {
		       LocalDateTime horaFinn = LocalDateTime.of(date.getYear(),date.getMonth(),date.getDayOfMonth(),date.getHour(),date.getMinute()).plusMinutes(30);		       
		       
		       Cita cita = new Cita(date,horaFinn,false, servicioBarbero.obtenerBarbero(id).get(),null);
		       serviciocita.agregarCita(cita);
			date=date.plusMinutes(30); 
			if( LocalTime.of(date.getHour(),date.getMinute()).compareTo(LocalTime.of(end.getHour(), end.getMinute()))>=0 ){
				LocalDateTime temporal=LocalDateTime.of(date.getYear(),date.getMonth(),date.getDayOfMonth(),date.getHour(),date.getMinute()).plusDays(1);
				date=LocalDateTime.of(temporal.getYear(),temporal.getMonth(),temporal.getDayOfMonth(),start.getHour(),start.getMinute());
				
			}
		}
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/obtenerTodos")
	public ResponseEntity<?> getAll(){
		return ResponseEntity.ok(serviciocita.obtenerTodasCitas());
	}
	
	@GetMapping("/obtenerCitasPorUsuario/{id}")
	public ResponseEntity<?> traerDatosPorUsuario(@PathVariable int id){
		return ResponseEntity.ok(serviciocita.obtenerCitasPorUsuario(id));

	}
	
	@GetMapping("/obtenerCitasPorBarbero/{id}")
	public ResponseEntity<?> getDatesByIdBarber(@PathVariable int id){
		List<Cita>citas=serviciocita.obtenerCitasPorBarbero(id);
		return ResponseEntity.ok(citas.size()>0?group.groupBy(citas):new String[]{}); 
	}
	
	@GetMapping("/datosCitaPorBarbero/{id}")
	public ResponseEntity<?> chaos(@PathVariable int id){
		return ResponseEntity.ok(serviciocita.obtenerCitasPorBarbero(id));
	}
	
	@PostMapping("/agendar/{date}/{user}")
	public ResponseEntity<?> setDate(@PathVariable int date, @PathVariable int user){
		Optional<Cita>body=serviciocita.obtenerCitaPorId(date);
		if(body.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		body.get().setUsuario(servicioUsuario.obtenerCliente(user).get());
		body.get().setEstadoCita(true);
		Cita cita=serviciocita.actualizarCita(body.get());
		return ResponseEntity.ok(cita); 
	}
	
	@PutMapping("/cancelarCita")
	public ResponseEntity<?> actualizar(@RequestBody Cita cita){
		serviciocita.actualizarCita(cita);
		return ResponseEntity.status(HttpStatus.OK).build(); 
	}

}

