package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.entity.ManoObra;
import com.proyecto5.cotizacionesce.repository.ManoObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManoObraService {

    @Autowired
    private ManoObraRepository manoObraRepository;
    public void createManoObras(List<ManoObraRequestDTO> manoObra, Long idCotizacion) {
        if (manoObra == null || manoObra.isEmpty()) {
            return;
        }

        for (ManoObraRequestDTO m : manoObra) {
            ManoObra manoObras = new ManoObra();
            manoObras.setNombreManoObra(m.getNombreMaterial());
            manoObras.setAreaTrabajarM2(m.getAreaTrabajarM2());
            manoObras.setRendimientoMaterialM2(m.getRendimientoMaterialM2());
            manoObras.setCostoMaterialUnitario(m.getCostoMaterialUnitario());
            manoObras.setManoObraPorM2(m.getManoObraPorM2());
            manoObras.setIdCotizacion(idCotizacion);

            manoObraRepository.save(manoObras);
        }
    }
}
