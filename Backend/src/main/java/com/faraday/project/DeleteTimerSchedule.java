package com.faraday.project;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.stereotype.Component;

@Component
public class DeleteTimerSchedule {
	
	public DeleteTimerSchedule(javax.sql.DataSource dataSource) {	
		try {
			Timer timer = new Timer(); 	
			Connection connection = dataSource.getConnection();
			Statement statement = connection.createStatement();
			TimerTask task = new TimerTask() {
				@Override 
				public void run(){
					try {
						statement.executeUpdate("DELETE FROM date_ WHERE start_date < NOW();");
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}};
				timer.schedule(task, 0, 60000);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		};
		
	}
};