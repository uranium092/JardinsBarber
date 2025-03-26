package com.faraday.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.faraday.project.entidades.Cita;
import com.faraday.project.repositorio.RepositorioBarbero;
import com.faraday.project.repositorio.RepositorioCita;
import com.faraday.project.repositorio.RepositorioUsuario;

@Service
public class ServicioCita {
	
	@Autowired
	private RepositorioCita repositorioCita;
	
	@Autowired
	private RepositorioUsuario repositorioUsuario;
	
	@Autowired
	private RepositorioBarbero repositorioBarbero;
	
	
	public List<Cita> obtenerCitasPorUsuario(int key){
		return repositorioCita.findByUsuario(repositorioUsuario.findById(key).get());
	}
	
	public Cita agregarCita(Cita cita) {
		return repositorioCita.save(cita);
	}
	
	public List<Cita> obtenerTodasCitas(){
		return repositorioCita.findAll();
	}
	
	public List<Cita> obtenerCitasPorBarbero(int key){
		return repositorioCita.findByBarbero(repositorioBarbero.findById(key).get());
	}
	
	public Optional<Cita> obtenerCitaPorId(int primary_key){
		return repositorioCita.findById(primary_key);
	}
	
	public Cita actualizarCita(Cita c) {
		return repositorioCita.save(c);
	}
	
	
}
	
	