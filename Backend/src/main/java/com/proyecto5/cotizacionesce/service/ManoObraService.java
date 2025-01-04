package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.dto.MaterialRequestDTO;
import com.proyecto5.cotizacionesce.entity.ManoObra;
import com.proyecto5.cotizacionesce.entity.Material;
import com.proyecto5.cotizacionesce.repository.CotizacionManoObraRepository;
import com.proyecto5.cotizacionesce.repository.ManoObraRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ManoObraService {

    @Autowired
    private ManoObraRepository manoObraRepository;
    @Autowired
    private CotizacionManoObraRepository cotizacionManoObraRepository;

    // Guardar o actualizar una lista de manos de obra
    public ManoObra crearManoObra(ManoObraRequestDTO dto) {
        ManoObra manoObra = new ManoObra();
        manoObra.setNombreManoObra(dto.getNombreManoObra());
        manoObra.setAreaTrabajarM2(dto.getAreaTrabajarM2());
        manoObra.setCostoUnitario(dto.getCostoUnitario());
        manoObra.setValorPorM2(dto.getValorPorM2());
        return manoObraRepository.save(manoObra);
    }

    // Eliminar una mano de obra por ID
    public void eliminarManoObra(Long idManoObra) {
        manoObraRepository.deleteById(idManoObra);
    }

    public List<Map<String, Object>> getManoObraByCotizacion(Long cotizacionId) {
        return cotizacionManoObraRepository.findManoObraByCotizacionId(cotizacionId);
    }
}
