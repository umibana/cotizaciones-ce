package com.proyecto5.cotizacionesce.controllers;


import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Proyecto> createProyecto(@RequestBody Proyecto proyecto){
        System.out.println("ENDPOINT WORKING");
        System.out.println(proyecto);
        proyectoService.createProyecto(proyecto);
        return ResponseEntity.ok(proyecto);
    }
}