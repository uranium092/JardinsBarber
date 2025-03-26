package com.faraday.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.faraday.project.entidades.Usuario;
import com.faraday.project.repositorio.RepositorioUsuario;

@Service
public class ServicioUsuario {
	
	@Autowired
	private RepositorioUsuario repositorioUsuario;

	public Usuario agregarCliente(Usuario usuario) {
		return repositorioUsuario.save(usuario);
	}
	
	public List<Usuario> obtenerTodosUsuarios(){
		return repositorioUsuario.findAll();
	}
	
	public Optional<Usuario> obtenerCliente(int id) {
		return repositorioUsuario.findById(id); 
	}
	
	public Usuario actualizarUser(Usuario u) {
		return repositorioUsuario.save(u);
	}

  public Usuario existencia(String email, String password){
		List<Usuario> users=repositorioUsuario.findAll();
    for(Usuario user:users){
      if(email.equals(user.getEmail_user()) && password.equals(user.getPassword_user())){
        return user;
      }
    }
    return null;
	}
	
}

