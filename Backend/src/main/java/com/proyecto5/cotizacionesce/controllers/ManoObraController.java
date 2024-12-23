package com.proyecto5.cotizacionesce.controllers;

import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.entity.ManoObra;
import com.proyecto5.cotizacionesce.repository.ManoObraRepository;
import com.proyecto5.cotizacionesce.service.CotizacionService;
import com.proyecto5.cotizacionesce.service.ManoObraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ManoObraController {

    @Autowired
    private ManoObraService manoObraService;

    // Guardar o actualizar manos de obra
    @PostMapping("/guardar")
    public ResponseEntity<?> guardarManoObra(@RequestBody @Valid List<ManoObraRequestDTO> manoObras) {
        try {
            manoObraService.guardarManoObra(manoObras);
            return ResponseEntity.ok("Mano de obra guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al guardar mano de obra: " + e.getMessage());
        }
    }

    // Listar manos de obra por cotización
    @GetMapping("/listar/{idCotizacion}")
    public ResponseEntity<List<ManoObra>> listarManosObra(@PathVariable Long idCotizacion) {
        return ResponseEntity.ok(manoObraService.listarManoObraPorCotizacion(idCotizacion));
    }

    // Eliminar mano de obra
    @DeleteMapping("/eliminar/{idManoObra}")
    public ResponseEntity<?> eliminarManoObra(@PathVariable Long idManoObra) {
        try {
            manoObraService.eliminarManoObra(idManoObra);
            return ResponseEntity.ok("Mano de obra eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar mano de obra: " + e.getMessage());
        }
    }

}
