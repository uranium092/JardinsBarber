package com.faraday.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.faraday.project.entidades.Barbero;
import com.faraday.project.services.ServicioBarbero;

@Configuration
public class DataInitializer {

	@Autowired
	private ServicioBarbero barber;

    @Bean
    CommandLineRunner initData() {
        return args -> {
           if(barber.existenciaDeCorreo("johnKimble@test.example.com").size()==0) {
        	   barber.agregarBarbero(new Barbero("John Kimble", "3240002200","johnKimble@test.example.com","development@password","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua","","admin"));
           }
        };
    }
	
}