package com.proyecto5.cotizacionesce.controllers;


import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.service.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProyectoController {
    private ProyectoService proyectoService;

    @GetMapping("/all")
    public ResponseEntity<List<Proyecto>> listarProyectos() {
        List<Proyecto> listaProyectos = proyectoService.getProyectos();
        return ResponseEntity.ok(listaProyectos);
    }

}