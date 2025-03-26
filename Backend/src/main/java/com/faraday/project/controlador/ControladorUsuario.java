package com.faraday.project.controlador;

import java.util.HashMap;
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

import com.faraday.project.entidades.Usuario;
import com.faraday.project.services.MailService;
import com.faraday.project.services.ServicioUsuario;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/usuario")
@CrossOrigin
public class ControladorUsuario {

	@Autowired
	private ServicioUsuario servicioUsuario;
	
  @Autowired
  private MailService mailService;
	
	@GetMapping("/traerTodo")
	public ResponseEntity<?> traerTodo(){
		return ResponseEntity.ok(servicioUsuario.obtenerTodosUsuarios());
	}
	
	@PostMapping("/insertarUsuario")
	public ResponseEntity<?> nuevoUsuario(@RequestBody Usuario usuario){
		servicioUsuario.agregarCliente(usuario);
		return ResponseEntity.status(HttpStatus.OK).body("Usario Registrado");
	}
	
	@GetMapping("/obtenerCliente/{key}")
	public ResponseEntity<?> obtenerCliente(@PathVariable int key){
		Optional<Usuario>user=servicioUsuario.obtenerCliente(key);
		if(user.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(user.get());
		}
		return ResponseEntity.notFound().build(); 
	}
	
	@PutMapping("/actualizar")
	public ResponseEntity<?> actualizar(@RequestBody Usuario user){
		return ResponseEntity.status(HttpStatus.OK).body(servicioUsuario.actualizarUser(user)); 
	}
	
	@GetMapping("/existenciaCorreo/{email}")
	public ResponseEntity<?> existsEmail(@PathVariable String email){
		for(Usuario u:servicioUsuario.obtenerTodosUsuarios()) {
			if(u.getEmail_user().equals(email)) {
				return ResponseEntity.ok(u);
			}
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/enviarEmail")
	public ResponseEntity<?> sendEmail(@RequestBody HashMap<String,String> data) throws MessagingException{
		mailService.sendEmail(data.get("to"), data.get("subject"), data.get("body"));
		return ResponseEntity.ok().build();
	}
	
}
