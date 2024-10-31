package com.proyecto5.cotizacionesce.service;// PersonalizadoService.java
import com.proyecto5.cotizacionesce.entity.Personalizado;
import com.proyecto5.cotizacionesce.repository.PersonalizadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonalizadoService {
    private final PersonalizadoRepository personalizadoRepository;

    public Personalizado createPersonalizado(Personalizado personalizado) {
        return personalizadoRepository.save(personalizado);
    }

    public Personalizado updatePersonalizado(Long id, Personalizado personalizado) {
        return personalizadoRepository.findById(id)
                .map(existing -> {
                    existing.setNombre(personalizado.getNombre());
                    existing.setDescripcion(personalizado.getDescripcion());
                    existing.setMetros(personalizado.getMetros());
                    existing.setPrecio(personalizado.getPrecio());
                    return personalizadoRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Item personalizado no encontrado"));
    }

    public void deletePersonalizado(Long id) {
        personalizadoRepository.deleteById(id);
    }

    public List<Personalizado> getPersonalizadosByCotizacion(Long cotizacionId) {
        return personalizadoRepository.findByCotizacionUniqueID(cotizacionId);
    }
}