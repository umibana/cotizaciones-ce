package com.proyecto5.cotizacionesce.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public/test")
    public ResponseEntity<Map<String,String>> publicTest() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Este es un endpoint publico!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/private/test")
    public ResponseEntity<Map<String, String>> privateTest() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Estas autorizado para ver este contenido");
        return ResponseEntity.ok(response);
    }
}