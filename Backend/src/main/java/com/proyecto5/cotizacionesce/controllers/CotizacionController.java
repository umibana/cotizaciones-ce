package com.proyecto5.cotizacionesce.controllers;
import com.proyecto5.cotizacionesce.entity.Cotizacion;
import com.proyecto5.cotizacionesce.service.CotizacionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.proyecto5.cotizacionesce.dto.CotizacionRequestDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cotizaciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CotizacionController {
    private final CotizacionService cotizacionService;

    @PostMapping("/crear")
    public ResponseEntity<?> createCotizacion(@Valid @RequestBody CotizacionRequestDTO request) {
        try {
            Cotizacion cotizacion = cotizacionService.createCotizacion(request);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cotización " + cotizacion.getId_Cotizacion() + " creada exitosamente");
            return ResponseEntity.ok(response);  // Send JSON
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error al crear la cotización: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Cotizacion> updateCotizacion(@PathVariable Long id, @RequestBody Cotizacion cotizacion) {
        return ResponseEntity.ok(cotizacionService.updateCotizacion(id, cotizacion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCotizacion(@PathVariable Long id) {
        cotizacionService.deleteCotizacion(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cotizacion> getCotizacion(@PathVariable Long id) {
        return ResponseEntity.ok(cotizacionService.getCotizacion(id));
    }

    @GetMapping("/proyecto/{proyectoId}")
    public ResponseEntity<List<Cotizacion>> getCotizacionesByProyecto(@PathVariable Long id_Proyecto) {
        return ResponseEntity.ok(cotizacionService.getCotizacionesByProyecto(id_Proyecto));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Cotizacion>> getCotizacionesByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(cotizacionService.getCotizacionesByEstado(estado));
    }
}
