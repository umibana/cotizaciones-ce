package com.proyecto5.cotizacionesce.controllers;


import com.proyecto5.cotizacionesce.dto.AsignarColaboradoresDTO;
import com.proyecto5.cotizacionesce.dto.ProyectoDTO;
import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.ProyectoUser;
import com.proyecto5.cotizacionesce.service.ProyectoService;
import com.proyecto5.cotizacionesce.service.ProyectoUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProyectoController {
    private final ProyectoService proyectoService;
    private final ProyectoUserService proyectoUserService;

    @GetMapping("/all")
    public ResponseEntity<List<Proyecto>> listarProyectos() {
        List<Proyecto> listaProyectos = proyectoService.getProyectos();
        return ResponseEntity.ok(listaProyectos);
    }

    @GetMapping("/{idProyecto}")
    public ResponseEntity<Optional<Proyecto>> obtenerProyectoPorId(@PathVariable Long idProyecto) {
        Optional<Proyecto> proyecto = proyectoService.getProyectoById(idProyecto);
        return ResponseEntity.ok(proyecto);
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

    @PostMapping("/{projectId}/asignar")
    public ResponseEntity<String> asignarColaboradores(@PathVariable Long projectId, @RequestBody AsignarColaboradoresDTO request) {
        try {
            proyectoService.asignarColaboradoresAlProyecto(projectId, request.getWorkerIds());
            return ResponseEntity.ok("Colaboradores asignados correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al asignar colaboradores: " + e.getMessage());
        }
    }

    @GetMapping("/asignados/all")
    public ResponseEntity<List<ProyectoUser>> listarProyectosAsignados() {
        List<ProyectoUser> listaProyectosAsignados = proyectoUserService.getProyectosUsers();
        return ResponseEntity.ok(listaProyectosAsignados);
    }
    @GetMapping("/asignados/{idUser}")
    public ResponseEntity<List<ProyectoUser>> listarProyectosAsignadosPorUsuario(@PathVariable Long idUser) {
        List<ProyectoUser> listaProyectosAsignados = proyectoUserService.getProyectoAsignados(idUser);
        return ResponseEntity.ok(listaProyectosAsignados);
    }

    @PostMapping("/estados")
    public ResponseEntity<Proyecto> estadoRevision(Proyecto unProyecto){
        proyectoService.estadoRevision(unProyecto);
        return ResponseEntity.ok(unProyecto);
    }
}