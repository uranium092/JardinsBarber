package com.faraday.project.entidades;

import java.time.LocalDateTime;

import jakarta.annotation.Generated;
import jakarta.persistence.*;

@Entity
@Table(name="date_")
public class Cita {
	
	public Cita() {
		
	}
	
	@Column(name="id_date")
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idCita;
	
	@Column(name="start_date")
	private LocalDateTime inicioCita;
	
	@Column(name="end_date")
	private LocalDateTime finCita;
	
	@Column(name="state_date")
	private boolean estadoCita;

	@JoinColumn(name="id_barber")
	@ManyToOne(cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	private Barbero barbero;
	
	@JoinColumn(name="id_user")
	@OneToOne(cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	private Usuario usuario;

	public int getIdCita() {
		return idCita;
	}

	public void setIdCita(int idCita) {
		this.idCita = idCita;
	}

	public LocalDateTime getInicioCita() {
		return inicioCita;
	}

	public void setInicioCita(LocalDateTime inicioCita) {
		this.inicioCita = inicioCita;
	}

	public LocalDateTime getFinCita() {
		return finCita;
	}

	public void setFinCita(LocalDateTime finCita) {
		this.finCita = finCita;
	}

	public boolean isEstadoCita() {
		return estadoCita;
	}

	public void setEstadoCita(boolean estadoCita) {
		this.estadoCita = estadoCita;
	}

	public Barbero getBarbero() {
		return barbero;
	}

	public void setBarbero(Barbero barbero) {
		this.barbero = barbero;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Cita(LocalDateTime inicioCita, LocalDateTime finCita, boolean estadoCita, Barbero barbero,
			Usuario usuario) {
		super();
		this.inicioCita = inicioCita;
		this.finCita = finCita;
		this.estadoCita = estadoCita;
		this.barbero = barbero;
		this.usuario = usuario;
	}

	@Override
	public String toString() {
		return "Cita [idCita=" + idCita + ", inicioCita=" + inicioCita + ", finCita=" + finCita + ", estadoCita="
				+ estadoCita + ", barbero=" + barbero + ", usuario=" + usuario + "]";
	}
	
	
}
