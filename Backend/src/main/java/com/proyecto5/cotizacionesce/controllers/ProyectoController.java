package com.proyecto5.cotizacionesce.controllers;


import com.proyecto5.cotizacionesce.dto.ProyectoDTO;
import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProyectoController {
    private final ProyectoService proyectoService;

    @GetMapping("/all")
    public ResponseEntity<List<Proyecto>> listarProyectos() {
        List<Proyecto> listaProyectos = proyectoService.getProyectos();
        return ResponseEntity.ok(listaProyectos);
    }

    @PostMapping
    public ResponseEntity<Proyecto> create(@RequestBody Proyecto proyecto){
        Proyecto proyectoNuevo = proyectoService.saveProyecto(proyecto);
        return ResponseEntity.ok(proyectoNuevo);
    }
    @PostMapping("/nuevo")
    public ResponseEntity<?> createProyecto(@RequestBody ProyectoDTO request) {
        try {
            Proyecto proyecto = proyectoService.createProyecto(request);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Proyecto " + proyecto.getIdProyecto() + " creada exitosamente");
            return ResponseEntity.ok(response);  // Send JSON
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al crear el proyecto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/estados")
    public ResponseEntity<Proyecto> estadoRevision(Proyecto unProyecto){
        proyectoService.estadoRevision(unProyecto);
        return ResponseEntity.ok(unProyecto);
    }
}