package com.proyecto5.cotizacionesce.service;// CotizacionMaterialService.java
import com.proyecto5.cotizacionesce.entity.CotizacionMaterial;
import com.proyecto5.cotizacionesce.repository.CotizacionMaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CotizacionMaterialService {
    private final CotizacionMaterialRepository cotizacionMaterialRepository;

    public CotizacionMaterial addMaterialToCotizacion(CotizacionMaterial cotizacionMaterial) {
        return cotizacionMaterialRepository.save(cotizacionMaterial);
    }

    public CotizacionMaterial updateCantidad(Long id, Integer cantidad) {
        return cotizacionMaterialRepository.findById(id)
                .map(existing -> {
                    existing.setCantidad(cantidad);
                    return cotizacionMaterialRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Material en cotización no encontrado"));
    }

    public void removeMaterialFromCotizacion(Long id) {
        cotizacionMaterialRepository.deleteById(id);
    }

    public List<CotizacionMaterial> getMaterialesByCotizacion(Long cotizacionId) {
        return cotizacionMaterialRepository.findByCotizacionUniqueID(cotizacionId);
    }
}