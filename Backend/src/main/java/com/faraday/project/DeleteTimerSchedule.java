package com.faraday.project;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.Timer;
import java.util.TimerTask;

import javax.sql.DataSource;

import org.springframework.stereotype.Component;

@Component
public class DeleteTimerSchedule {

    private final DataSource dataSource;
    private final Timer timer;

    public DeleteTimerSchedule(DataSource dataSource) {
        this.dataSource = dataSource;
        this.timer = new Timer(true);
        scheduleTask();
    }

    private void scheduleTask() {
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                try (Connection connection = dataSource.getConnection();
                     Statement statement = connection.createStatement()) {
                    statement.executeUpdate("DELETE FROM date_ WHERE start_date < NOW();");
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        };

        timer.schedule(task, 0, 60000);
    }
}
