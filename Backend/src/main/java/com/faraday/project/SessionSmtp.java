package com.faraday.project;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.mail.Session;
import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;

@Configuration
public class SessionSmtp {
  
  @Value("${email.auth.smtp:-}")
  private String userName;

  @Value("${password.auth.smtp:-}")
  private String password;

  @Bean
  public Session createSession(){
    if(userName.equals("-")||password.equals("-")){
      System.out.println("******** Impossible to create a session with Gmail Smtp. No credentials ********");
      return null;
    }
    String host = "smtp.gmail.com";
	  Properties properties = System.getProperties();
	  properties.put("mail.smtp.host", host);
	  properties.put("mail.smtp.port", "465");
	  properties.put("mail.smtp.ssl.enable", "true");
	  properties.put("mail.smtp.auth", "true");
    return Session.getInstance(properties, new Authenticator(){
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
      }
    });
  }

}