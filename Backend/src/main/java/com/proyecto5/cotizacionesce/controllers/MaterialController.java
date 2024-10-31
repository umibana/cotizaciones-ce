package com.proyecto5.cotizacionesce.controllers;// MaterialController.java
import com.proyecto5.cotizacionesce.entity.Material;
import com.proyecto5.cotizacionesce.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiales")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MaterialController {
    private final MaterialService materialService;

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