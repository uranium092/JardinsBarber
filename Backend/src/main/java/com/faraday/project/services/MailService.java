package com.faraday.project.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import jakarta.mail.Address;
import jakarta.mail.Message;
import jakarta.mail.Message.RecipientType;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

  @Value("${email.auth.smtp:-}")
  private String userName;
 
  private Session session;

  public MailService(@Nullable Session session){
    this.session=session;
  }

  public void sendEmail(String to, String Subject, String bodyMessage) throws MessagingException{
    System.out.println(session);
    if(session==null){
      System.out.println("******** Send email disabled. No Session ********");
      return;
    }
    MimeMessage message = new MimeMessage(session);
	  message.setFrom(new InternetAddress(userName));
	  message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
	  message.setSubject(Subject, "UTF-8");
	  message.setContent(bodyMessage, "text/html; charset=UTF-8");
	  Transport.send(message);
  }

  public void sendManyEmails(Address[]to,String Subject, String bodyMessage) throws MessagingException{
    if(session==null){
      System.out.println("******** Send email disabled. No Session ********");
      return;
    }
    MimeMessage message = new MimeMessage(session);
	  message.setFrom(new InternetAddress("jardinsbarber@gmail.com"));
	  message.setSubject(Subject, "UTF-8");
	  message.addRecipients(RecipientType.TO, to);
	  message.setContent(bodyMessage, "text/html; charset=UTF-8");
	  Transport.send(message);
  }

}