package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.entity.CotizacionManoObra;
import com.proyecto5.cotizacionesce.repository.CotizacionManoObraRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CotizacionManoObraService {
    private final CotizacionManoObraRepository cotizacionManoObraRepository;

    public CotizacionManoObraService(CotizacionManoObraRepository cotizacionManoObraRepository) {
        this.cotizacionManoObraRepository = cotizacionManoObraRepository;
    }

    public void createCotizacionManoObra(List<ManoObraRequestDTO> manoObra, Long idCotizacion) {
        for (ManoObraRequestDTO manoObraRequest : manoObra) {
            CotizacionManoObra cotizacionManoObra = new CotizacionManoObra();
            cotizacionManoObra.setIdManoObra(manoObraRequest.getIdManoObra());
            cotizacionManoObra.setIdCotizacion(idCotizacion);
            cotizacionManoObraRepository.save(cotizacionManoObra);
        }
    }

}
