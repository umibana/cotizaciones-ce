package com.proyecto5.cotizacionesce.controllers;

import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.entity.ManoObra;
import com.proyecto5.cotizacionesce.repository.ManoObraRepository;
import com.proyecto5.cotizacionesce.service.CotizacionService;
import com.proyecto5.cotizacionesce.service.ManoObraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RestController
@RequestMapping("/api/mano-obra")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ManoObraController {

    @Autowired
    private ManoObraService manoObraService;

    @GetMapping("/cotizacion/{cotizacionId}")
    public ResponseEntity<?> listarMaterialesPorCotizacion(@PathVariable Long cotizacionId) {
        try {
            List<Map<String, Object>> manoObra = manoObraService.getManoObraByCotizacion(cotizacionId);

            if (manoObra.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("No se encontraron manos de obra para la cotización especificada");
            }

            return ResponseEntity.ok(manoObra);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener la mano de obra de la cotización: " + e.getMessage());
        }
    }

    // Listar manos de obra por cotización
//    @GetMapping("/listar/{idCotizacion}")
//    public ResponseEntity<List<ManoObra>> listarManosObra(@PathVariable Long idCotizacion) {
//        return ResponseEntity.ok(manoObraService.listarManoObraPorCotizacion(idCotizacion));
//    }
//
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
