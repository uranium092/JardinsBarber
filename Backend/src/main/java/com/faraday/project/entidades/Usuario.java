package com.faraday.project.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user_")
public class Usuario {
	
	public Usuario() {
		
	}

	public Usuario(int id_user, String name_user, String phone_user, String email_user, String password_user) {
		super();
		this.name_user = name_user;
		this.phone_user = phone_user;
		this.email_user = email_user;
		this.password_user = password_user;
	}

	@Column(name="id_user")
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id_user;
	
	@Column(name="name_user")
	private String name_user;
	
	@Column(name="phone_user")
	private String phone_user;
	
	@Column(name="email_user")
	private String email_user;
	
	@Column(name="password_user")
	private String password_user;

	public int getId_user() {
		return id_user;
	}

	public void setId_user(int id_user) {
		this.id_user = id_user;
	}

	public String getName_user() {
		return name_user;
	}

	public void setName_user(String name_user) {
		this.name_user = name_user;
	}

	public String getPhone_user() {
		return phone_user;
	}

	public void setPhone_user(String phone_user) {
		this.phone_user = phone_user;
	}

	public String getEmail_user() {
		return email_user;
	}

	public void setEmail_user(String email_user) {
		this.email_user = email_user;
	}

	public String getPassword_user() {
		return password_user;
	}

	public void setPassword_user(String password_user) {
		this.password_user = password_user;
	}
	
	
	

}
