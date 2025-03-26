package com.faraday.project.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.faraday.project.entidades.Barbero;

@Repository
public interface RepositorioBarbero extends JpaRepository<Barbero,Integer>{
	List<Barbero>findByEmailBarberAndPasswordBarber(String email, String pass);
	List<Barbero>findByEmailBarber(String e);
}
