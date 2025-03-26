package com.faraday.project;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.stereotype.Component;

@Component
public class EliminacionProgramada {
	public EliminacionProgramada() {
		Timer timer = new Timer(); 		
		TimerTask tarea = new TimerTask() {
			@Override 
			public void run(){
				
				 try (Connection conexion = DriverManager.getConnection(
			                "jdbc:mysql://mysql-proyecto.crwwm64w6r3h.us-east-2.rds.amazonaws.com:3306/jardinsbarber", 
			                "root", 
			                "admin1234");
			             Statement declaracion = conexion.createStatement()) {
			             
			            int sentencia = declaracion.executeUpdate("DELETE FROM date_ WHERE start_date < NOW();");
			            System.out.println("Rows affected: " + sentencia);
			            
			        } catch (SQLException e) {
			            e.printStackTrace();
			        }
				
			}
		};
		
		timer.schedule(tarea, 0, 60000);
		
	}
};


