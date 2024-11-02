package com.proyecto5.cotizacionesce.controllers;
import com.proyecto5.cotizacionesce.entity.Cotizacion;
import com.proyecto5.cotizacionesce.service.CotizacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cotizaciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CotizacionController {
    private final CotizacionService cotizacionService;

    @PostMapping
    public ResponseEntity<Cotizacion> createCotizacion(@RequestBody Cotizacion cotizacion) {
        return ResponseEntity.ok(cotizacionService.createCotizacion(cotizacion));
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
    public ResponseEntity<List<Cotizacion>> getCotizacionesByProyecto(@PathVariable Long idProyecto) {
        return ResponseEntity.ok(cotizacionService.getCotizacionesByProyecto(idProyecto));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Cotizacion>> getCotizacionesByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(cotizacionService.getCotizacionesByEstado(estado));
    }
}