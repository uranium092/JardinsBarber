package com.faraday.project.controlador;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.faraday.project.entidades.Barbero;
import com.faraday.project.services.MailService;
import com.faraday.project.services.ServicioBarbero;

import jakarta.mail.Address;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;

@RestController
@RequestMapping("/barbero")
@CrossOrigin
public class ControladorBarbero {
  
  @Autowired
  private ServicioBarbero servicioBarbero;

  @Autowired
  private MailService mailService;
  
  @PostMapping("/insertarBarberoSinFoto")
  public ResponseEntity<?> agregarBarberoSinFoto(@RequestBody Barbero barber){
    servicioBarbero.agregarBarbero(barber);
    return ResponseEntity.ok().build(); 
  }
  
  @PostMapping("/insertarBarberoConFoto")
  public ResponseEntity<?> agregarBarberoConFoto(@RequestParam("nombre") String nombre, @RequestParam("numero")String tel, @RequestParam("correo") String email, @RequestParam("contrasena") String contrasena, @RequestParam("descripcion")String descripcion, @RequestParam("foto")MultipartFile file){
    Barbero barber=new Barbero(nombre, tel, email,contrasena,descripcion,"","barbero");
    Barbero barberInserted=servicioBarbero.agregarBarbero(barber);
    try {
      cargarArchivo(barberInserted, file);
      return ResponseEntity.status(HttpStatus.OK).build();
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    
  }
  
  @GetMapping("/obtenerTodos")
  public ResponseEntity<?> getAll(){
    return ResponseEntity.ok(servicioBarbero.obtenerTodosBarberos());
  }
  
  void cargarArchivo(Barbero barber, MultipartFile file)throws IOException{
    File destino=Paths.get("images/"+barber.getIdBarber()).toFile();
    if(destino.exists()) {
      for(File f:destino.listFiles()) {
        Paths.get("images/"+barber.getIdBarber()+"/"+f.getName()).toFile().delete();
      }
    }else {
      destino.mkdir();
    }
    byte[] bytes=file.getBytes();
    Files.write(Paths.get(destino.getAbsolutePath()+"/"+file.getOriginalFilename()), bytes);
    barber.setProfilePicture(file.getOriginalFilename());
    servicioBarbero.actualizarBarber(barber);
  }
  
  @PutMapping("/actualizarBarberoSinFoto")
  public ResponseEntity<?> actualizarbarberosinfoto(@RequestBody Barbero barber){
    barber.setProfilePicture(servicioBarbero.obtenerBarbero(barber.getIdBarber()).get().getProfilePicture());
    servicioBarbero.actualizarBarber(barber);
    return ResponseEntity.status(HttpStatus.OK).build();
  }
  
  @PutMapping("/actualizarBarberoConFoto")
  public ResponseEntity<?> actualizarbarberosconfoto(@RequestParam("nombre") String nombre, @RequestParam("numero")String tel, @RequestParam("correo") String email, @RequestParam("contrasena") String contrasena, @RequestParam("descripcion")String descripcion, @RequestParam("foto")MultipartFile file, @RequestParam("role") String role, @RequestParam("id")int id){
    try {
      cargarArchivo(new Barbero(id,nombre,tel,email,contrasena,descripcion,null,role), file);
      return ResponseEntity.ok().build(); 
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }
  
  @GetMapping("/existencia/{email}/{pass}")
  public ResponseEntity<?> existencia(@PathVariable String email, @PathVariable String pass){
    List<Barbero>match=servicioBarbero.existencia(email, pass);
    if(match.size()>0) return ResponseEntity.status(HttpStatus.OK).body(match);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
  }
  
  @GetMapping("/obtener/{key}")
  public ResponseEntity<?> getBarber(@PathVariable int key){
    Optional<Barbero> Record=servicioBarbero.obtenerBarbero(key);
    if(!Record.isEmpty()) return ResponseEntity.status(HttpStatus.OK).body(Record.get());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
  }
  
  
  @GetMapping("/existenciaCorreo/{email}")
  public ResponseEntity<?> existsEmail(@PathVariable String email){
    List<Barbero>match=servicioBarbero.existenciaDeCorreo(email);
    if(match.size()==0) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(match.get(0)); 
  }
  
  @DeleteMapping("/eliminar/{key}")
  public ResponseEntity<?> deleteBarber(@PathVariable int key){
    servicioBarbero.eliminarBarbero(key);
    return ResponseEntity.status(HttpStatus.OK).build(); 
  }
  
  @PostMapping("/enviarEmail")
  public ResponseEntity<?> sendEmail(@RequestBody HashMap<String,String> data) throws MessagingException{
    mailService.sendEmail(data.get("to"), data.get("subject"), data.get("body"));
		return ResponseEntity.ok().build(); 
	}
	
	@PostMapping("/notificarDespido")
	public ResponseEntity<?> notifyEveryone(@RequestBody HashMap<String,Object>data) throws MessagingException{
		List<String>emails=(ArrayList<String>)data.get("to");
		Address[]recipients=new Address[emails.size()];
		for(int p=0;p<emails.size();p++) {
			try {
				recipients[p]=new InternetAddress(emails.get(p));
			} catch (AddressException e) {
				e.printStackTrace();
				return ResponseEntity.internalServerError().build();
			}
		}
		mailService.sendManyEmails(recipients,((String)data.get("subject")),((String)data.get("bodyMessage")));
		return ResponseEntity.ok().build(); 
	}
	
}