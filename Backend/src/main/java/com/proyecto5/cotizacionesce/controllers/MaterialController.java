package com.proyecto5.cotizacionesce.controllers;// MaterialController.java

import com.proyecto5.cotizacionesce.entity.Material;
import com.proyecto5.cotizacionesce.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/materiales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MaterialController {
    private final MaterialService materialService;

    @GetMapping("/all")
    public ResponseEntity<?> listarMateriales() {
        try {
            List<Material> listaMateriales = materialService.getAllmaterial();

            if (listaMateriales.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("No se encontraron materiales");
            }

            return ResponseEntity.ok(listaMateriales);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los materiales: " + e.getMessage());
        }
    }

    @GetMapping("/cotizacion/{cotizacionId}")
    public ResponseEntity<?> listarMaterialesPorCotizacion(@PathVariable Long cotizacionId) {
        try {
            List<Map<String, Object>> materiales = materialService.getMaterialesByCotizacionId(cotizacionId);

            if (materiales.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("No se encontraron materiales para la cotización especificada");
            }

            return ResponseEntity.ok(materiales);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los materiales de la cotización: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Material> createMaterial(@RequestBody Material material) {
        return ResponseEntity.ok(materialService.createMaterial(material));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Long id, @RequestBody Material material) {
        return ResponseEntity.ok(materialService.updateMaterial(id, material));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Material>> searchMateriales(@RequestParam String nombre) {
        return ResponseEntity.ok(materialService.searchMaterialesByNombre(nombre));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterial(@PathVariable Long id) {
        return ResponseEntity.ok(materialService.getMaterial(id));
    }
}