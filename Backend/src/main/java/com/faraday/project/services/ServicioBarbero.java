package com.faraday.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.faraday.project.entidades.Barbero;
import com.faraday.project.repositorio.RepositorioBarbero;

@Service
public class ServicioBarbero {
	
	@Autowired
	private RepositorioBarbero repositorioBarbero;
	
	public Barbero agregarBarbero(Barbero barbero) {
		return repositorioBarbero.save(barbero);
	}
	
	public Barbero actualizarBarber(Barbero b) {
		return repositorioBarbero.save(b);
	}
	
	public List<Barbero>existencia(String email, String password){
		return repositorioBarbero.findByEmailBarberAndPasswordBarber(email, password); 
	}
	
	public Optional<Barbero> obtenerBarbero(int id){
		return repositorioBarbero.findById(id);
	}
	public List<Barbero> obtenerTodosBarberos(){
		return repositorioBarbero.findAll();
	}
	
	public List<Barbero> existenciaDeCorreo(String email){
		return repositorioBarbero.findByEmailBarber(email); 	
	}
	
	public void eliminarBarbero(int id){
		repositorioBarbero.deleteById(id);
	}
	
	

}
