package com.faraday.project.entidades;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="barber_")
public class Barbero {
	
	public Barbero() {
		
	}

	

	public int getIdBarber() {
		return idBarber;
	}

	public void setIdBarber(int idBarber) {
		this.idBarber = idBarber;
	}

	public String getNameBarber() {
		return nameBarber;
	}

	public void setNameBarber(String nameBarber) {
		this.nameBarber = nameBarber;
	}

	public String getPhoneBarber() {
		return phoneBarber;
	}

	public void setPhoneBarber(String phoneBarber) {
		this.phoneBarber = phoneBarber;
	}

	public String getEmailBarber() {
		return emailBarber;
	}

	public void setEmailBarber(String emailBarber) {
		this.emailBarber = emailBarber;
	}

	public String getPasswordBarber() {
		return passwordBarber;
	}

	public void setPasswordBarber(String passwordBarber) {
		this.passwordBarber = passwordBarber;
	}

	public String getDescriptionBarber() {
		return descriptionBarber;
	}

	public void setDescriptionBarber(String descriptionBarber) {
		this.descriptionBarber = descriptionBarber;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}



	@Override
	public String toString() {
		return "Barbero [idBarber=" + idBarber + ", nameBarber=" + nameBarber + ", phoneBarber=" + phoneBarber
				+ ", emailBarber=" + emailBarber + ", passwordBarber=" + passwordBarber + ", descriptionBarber="
				+ descriptionBarber + ", profilePicture=" + profilePicture + ", role=" + role + "]";
	}



	@Column(name="id_barber")
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idBarber;
	
	@Column(name="name_barber")
	private String nameBarber;
	
	@Column(name="phone_barber")
	private String phoneBarber;
	
	@Column(name="email_barber")
	private String emailBarber;
	
	@Column(name="password_barber")
	private String passwordBarber;
	
	@Column(name="description_barber")
	private String descriptionBarber;
	
	@Column(name="profile_picture")
	private String profilePicture;
	
	@Column(name="role")
	private String role;
	
	@OneToMany(mappedBy = "barbero", cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Cita> cita;

	public Barbero(String nameBarber, String phoneBarber, String emailBarber, String passwordBarber,
			String descriptionBarber, String profilePicture, String role) {
		super();
		this.nameBarber = nameBarber;
		this.phoneBarber = phoneBarber;
		this.emailBarber = emailBarber;
		this.passwordBarber = passwordBarber;
		this.descriptionBarber = descriptionBarber;
		this.profilePicture = profilePicture;
		this.role = role;
	}



	public Barbero(int idBarber, String nameBarber, String phoneBarber, String emailBarber, String passwordBarber,
			String descriptionBarber, String profilePicture, String role) {
		super();
		this.idBarber = idBarber;
		this.nameBarber = nameBarber;
		this.phoneBarber = phoneBarber;
		this.emailBarber = emailBarber;
		this.passwordBarber = passwordBarber;
		this.descriptionBarber = descriptionBarber;
		this.profilePicture = profilePicture;
		this.role = role;
	}


	
	

}
