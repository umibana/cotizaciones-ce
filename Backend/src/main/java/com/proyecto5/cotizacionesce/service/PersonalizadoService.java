package com.proyecto5.cotizacionesce.service;// PersonalizadoService.java
import com.proyecto5.cotizacionesce.dto.PersonalizadoDTO;
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
    public void createPersonalizados(List<PersonalizadoDTO> extraItems, Long idCotizacion) {
        if (extraItems != null && !extraItems.isEmpty()) {
            for (PersonalizadoDTO itemDTO : extraItems) {
                Personalizado item = new Personalizado();
                item.setNombre(itemDTO.getNombre());
                item.setDescripcion(itemDTO.getDescripcion());
                item.setMetros(itemDTO.getMetros());
                item.setPrecio(itemDTO.getPrecio());
                item.setIdCotizacion(idCotizacion);

                personalizadoRepository.save(item);
            }
        }
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
        return personalizadoRepository.findByIdCotizacion(cotizacionId);
    }
}