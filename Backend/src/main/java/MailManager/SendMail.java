package MailManager;

import java.util.Properties;

import jakarta.mail.*;
import jakarta.mail.internet.*;

public class SendMail {
	public SendMail(String to, String Subject, String bodyMessage){
	      String host = "smtp.gmail.com";
	      Properties properties = System.getProperties();
	      properties.put("mail.smtp.host", host);
	      properties.put("mail.smtp.port", "465");
	      properties.put("mail.smtp.ssl.enable", "true");
	      properties.put("mail.smtp.auth", "true");

	      Session session = Session.getInstance(properties, new Authenticator(){
	        protected PasswordAuthentication getPasswordAuthentication() {
	          return new PasswordAuthentication("jardinsbarber@gmail.com", "mpqp jrbi kgzi xaea");
	        }
	      });

	      try {
	        MimeMessage message = new MimeMessage(session);
	        message.setFrom(new InternetAddress("jardinsbarber@gmail.com"));
	        message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
	        message.setSubject(Subject, "UTF-8");
	        message.setContent(bodyMessage, "text/html; charset=UTF-8");
	       

	        Transport.send(message);
	      } catch (MessagingException mex) {
	        mex.printStackTrace();
	      }

	}
}