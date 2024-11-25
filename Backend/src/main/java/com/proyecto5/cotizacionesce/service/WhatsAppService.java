package com.proyecto5.cotizacionesce.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WhatsAppService {

    @Value("${whatsapp.api.url}")
    private String whatsappApiUrl;

    @Value("${whatsapp.api.token}")
    private String accessToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public void enviarAsignacionWhatsapp(String numero, String nombreProyecto, String nombreMaestro,
            String direccion, String numeroSupervisor) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        String requestBody = String.format(
                """
                        {"messaging_product":"whatsapp","recipient_type":"individual","to":"%s","type":"template","template":{"name":"cotizacion_asignada","language":{"code":"es"},"components":[{"type":"header","parameters":[{"type":"text","text":"%s"}]},{"type":"body","parameters":[{"type":"text","text":"%s"},{"type":"text","text":"%s"},{"type":"text","text":"%s"},{"type":"text","text":"%s"}]}]}}""",
                numero, nombreProyecto, nombreMaestro, nombreProyecto, direccion, numeroSupervisor);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(whatsappApiUrl, request, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Error sending WhatsApp message. Status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error sending WhatsApp message: " + e.getMessage());
        }
    }
}