package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.entity.ManoObra;
import com.proyecto5.cotizacionesce.repository.ManoObraRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManoObraService {

    @Autowired
    private ManoObraRepository manoObraRepository;

    // Guardar o actualizar una lista de manos de obra
    @Transactional
    public void guardarManoObra(List<ManoObraRequestDTO> manoObraDTOs) {
        List<ManoObra> manosObra = manoObraDTOs.stream().map(dto -> {
            ManoObra manoObra = new ManoObra();
            manoObra.setIdManoObra(dto.getIdManoObra());
            manoObra.setNombreManoObra(dto.getNombreManoObra());
            manoObra.setAreaTrabajarM2(dto.getAreaTrabajarM2());
            manoObra.setCostoUnitario(dto.getCostoUnitario());
            manoObra.setValorPorM2(dto.getValorPorM2());
            manoObra.setIdCotizacion(dto.getIdCotizacion());

            System.out.println("Guardando mano de obra: " + manoObra);
            return manoObra;
        }).collect(Collectors.toList());

        // Log para depuración


        manoObraRepository.saveAll(manosObra);
        System.out.println("Se guardaron las manos de obra en la base de datos.");
    }

    // Obtener las manos de obra por ID de cotización
    public List<ManoObra> listarManoObraPorCotizacion(Long idCotizacion) {
        return manoObraRepository.findByIdCotizacion(idCotizacion);
    }

    // Eliminar una mano de obra por ID
    public void eliminarManoObra(Long idManoObra) {
        manoObraRepository.deleteById(idManoObra);
    }
}
