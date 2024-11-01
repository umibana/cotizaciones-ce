package com.proyecto5.cotizacionesce.controllers;// PersonalizadoController.java
import com.proyecto5.cotizacionesce.entity.Personalizado;
import com.proyecto5.cotizacionesce.service.PersonalizadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personalizados")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PersonalizadoController {
    private final PersonalizadoService personalizadoService;

    @PostMapping
    public ResponseEntity<Personalizado> createPersonalizado(@RequestBody Personalizado personalizado) {
        return ResponseEntity.ok(personalizadoService.createPersonalizado(personalizado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personalizado> updatePersonalizado(@PathVariable Long id, @RequestBody Personalizado personalizado) {
        return ResponseEntity.ok(personalizadoService.updatePersonalizado(id, personalizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersonalizado(@PathVariable Long id) {
        personalizadoService.deletePersonalizado(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cotizacion/{cotizacionId}")
    public ResponseEntity<List<Personalizado>> getPersonalizadosByCotizacion(@PathVariable Long cotizacionId) {
        return ResponseEntity.ok(personalizadoService.getPersonalizadosByCotizacion(cotizacionId));
    }
}