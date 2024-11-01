package com.proyecto5.cotizacionesce.controllers;


import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.service.ProyectoService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProyectoController {
    private ProyectoService proyectoService;

    @GetMapping("")
    public ResponseEntity<List<Proyecto>> listarProyectos() {
        List<Proyecto> listaProyectos = proyectoService.getProyectos();
        return ResponseEntity.ok(listaProyectos);
    }

}