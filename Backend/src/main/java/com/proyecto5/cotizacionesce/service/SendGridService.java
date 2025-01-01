package com.proyecto5.cotizacionesce.service;


import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SendGridService {

    private final SendGrid sendGrid;

    public SendGridService(SendGrid sendGrid){
        this.sendGrid = sendGrid;
    }

    @Value("${sendgrid.email.from}")
    private String fromEmail;

    public String sendEmail(String toEmail, String subject, String body){
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        Content content = new Content("text/html",body);
        Mail mail = new Mail(from, subject, to, content);

        try {
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            return "Correo enviado con estado: " + response.getStatusCode();
        }catch (IOException exception){
            throw new RuntimeException("Error al enviar el correo: " + exception.getMessage(), exception);
        }
    }
}
