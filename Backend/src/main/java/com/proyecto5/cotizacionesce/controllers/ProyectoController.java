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

import java.time.LocalDate;
import java.util.*;

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
    public ResponseEntity<Proyecto> create(@RequestBody Proyecto proyecto) {
        Proyecto proyectoNuevo = proyectoService.saveProyecto(proyecto);
        return ResponseEntity.ok(proyectoNuevo);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<?> createProyecto(@RequestBody ProyectoDTO request) {
        try {
            Proyecto proyecto = proyectoService.createProyecto(request);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Proyecto " + proyecto.getIdProyecto() + " creada exitosamente");
            return ResponseEntity.ok(response); // Send JSON
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al crear el proyecto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/{projectId}/asignar")
    public ResponseEntity<?> asignarColaboradores(@PathVariable Long projectId,
            @RequestBody AsignarColaboradoresDTO request) {
        try {
            proyectoService.asignarColaboradoresAlProyecto(projectId, request.getWorkerIds());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Trabajadores asignados correctamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al asignar el proyecto: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
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

    @PutMapping("/estados/{idProyecto}")
    public ResponseEntity<Proyecto> estadoRevision(@PathVariable Long idProyecto) {
        Proyecto proyecto = proyectoService.estadoRevision(idProyecto);
        return ResponseEntity.ok(proyecto);
    }

    @PutMapping("/aprobados/{idProyecto}")
    public ResponseEntity<Proyecto> estadoAprobado(@PathVariable Long idProyecto){
        Proyecto proyecto = proyectoService.estadoAprobado(idProyecto);
        return ResponseEntity.ok(proyecto);
    }

    @PutMapping("/terminados/{idProyecto}")
    public ResponseEntity<Proyecto> estadoTerminado(@PathVariable Long idProyecto){
        Proyecto proyecto = proyectoService.estadoTerminado(idProyecto);
        return ResponseEntity.ok(proyecto);
    }

    @PostMapping("/eliminados/{idProyecto}")
    public ResponseEntity<Proyecto> estadoEliminado(@PathVariable Long idProyecto){
        Proyecto proyecto = proyectoService.estadoEliminado(idProyecto);
        return ResponseEntity.ok(proyecto);
    }

    @PostMapping("/asignadosEmail")
    public ResponseEntity<List<Proyecto>> listarProyectosAsignadosPorEmail(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        List<Proyecto> proyecto = proyectoService.listaProyectosAsignadosPorEmail(email);
        return ResponseEntity.ok(proyecto);
    }
    @PostMapping("/diastrabajo/{id}")
    public ResponseEntity<String> updateDiasTrabajo(@PathVariable Long id, @RequestBody List<String> diasTrabajo) {
        try {
            proyectoService.updateDiasTrabajo(id, diasTrabajo);
            return ResponseEntity.ok("Días de trabajo actualizados correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar los días de trabajo.");
        }
    }

}