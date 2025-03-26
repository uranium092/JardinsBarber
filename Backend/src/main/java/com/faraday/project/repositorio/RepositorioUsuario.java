package com.faraday.project.repositorio;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.faraday.project.entidades.Usuario;

@Repository
public interface RepositorioUsuario extends JpaRepository<Usuario,Integer> {
	
}