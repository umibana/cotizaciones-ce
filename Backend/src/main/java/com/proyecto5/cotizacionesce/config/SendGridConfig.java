package com.proyecto5.cotizacionesce.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SendGridConfig {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Bean
    public SendGrid sendGrid(){
        if(sendGridApiKey == null){
            throw new IllegalStateException("la Api no esta configurada");
        }
        return new SendGrid(sendGridApiKey);
    }
}
