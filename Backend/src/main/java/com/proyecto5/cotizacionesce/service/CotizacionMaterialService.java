package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.MaterialRequestDTO;
import com.proyecto5.cotizacionesce.entity.CotizacionMaterial;
import com.proyecto5.cotizacionesce.repository.CotizacionMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CotizacionMaterialService {
    private final CotizacionMaterialRepository cotizacionMaterialRepository;

    public CotizacionMaterialService(CotizacionMaterialRepository cotizacionMaterialRepository) {
        this.cotizacionMaterialRepository = cotizacionMaterialRepository;
    }

    public void createCotizacionMateriales(List<MaterialRequestDTO> materials, Long idCotizacion) {
        for (MaterialRequestDTO materialRequest : materials) {
            CotizacionMaterial cotizacionMaterial = new CotizacionMaterial();
            cotizacionMaterial.setIdMaterial(materialRequest.getIdMaterial());
            cotizacionMaterial.setIdCotizacion(idCotizacion);
            cotizacionMaterial.setCantidad(materialRequest.getCantidad());

            cotizacionMaterialRepository.save(cotizacionMaterial);
        }
    }
    /*
    public void getCotizacion(){
        return;
    }
    */
}
