package com.faraday.project.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.faraday.project.entidades.Barbero;
import com.faraday.project.entidades.Cita;
import com.faraday.project.entidades.Usuario;

import java.util.*;

public interface RepositorioCita extends JpaRepository<Cita, Integer> {
	public List<Cita> findByBarbero(Barbero b);

	public List<Cita> findByUsuario(Usuario usuario);
}