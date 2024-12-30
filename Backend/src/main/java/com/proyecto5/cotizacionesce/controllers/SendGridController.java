package com.proyecto5.cotizacionesce.controllers;

import com.proyecto5.cotizacionesce.service.SendGridService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emails")
public class SendGridController {

    private final SendGridService sendGridService;

    @Autowired
    public SendGridController(SendGridService sendGridService) {
        this.sendGridService = sendGridService;
    }

    @PostMapping("/enviar")
    public String enviarEmail(@RequestParam String toEmail,
            @RequestParam String subject, @RequestParam String body) {
        return sendGridService.sendEmail(toEmail, subject, body);
    }
}
