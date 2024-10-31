package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Cotizacion;
import com.proyecto5.cotizacionesce.repository.CotizacionMaterialRepository;
import com.proyecto5.cotizacionesce.repository.CotizacionRepository;
import com.proyecto5.cotizacionesce.repository.ImagenCotizacionRepository;
import com.proyecto5.cotizacionesce.repository.PersonalizadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CotizacionService {
    private final CotizacionRepository cotizacionRepository;
    private final ImagenCotizacionRepository imagenCotizacionRepository;
    private final CotizacionMaterialRepository cotizacionMaterialRepository;
    private final PersonalizadoRepository personalizadoRepository;

    public Cotizacion createCotizacion(Cotizacion cotizacion) {
        cotizacion.setTimestamp(LocalDateTime.now());
        return cotizacionRepository.save(cotizacion);
    }

    public Cotizacion updateCotizacion(Long id, Cotizacion cotizacion) {
        return cotizacionRepository.findById(id)
                .map(existing -> {
                    existing.setValidezOferta(cotizacion.getValidezOferta());
                    existing.setPrecioTentativo(cotizacion.getPrecioTentativo());
                    existing.setCondDePago(cotizacion.getCondDePago());
                    existing.setPlazoDeEntrega(cotizacion.getPlazoDeEntrega());
                    existing.setNotas(cotizacion.getNotas());
                    existing.setPorcentaje(cotizacion.getPorcentaje());
                    existing.setEstado(cotizacion.getEstado());
                    return cotizacionRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));
    }

    public void deleteCotizacion(Long id) {
        cotizacionRepository.deleteById(id);
    }

    public Cotizacion getCotizacion(Long id) {
        return cotizacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));
    }

    public List<Cotizacion> getCotizacionesByProyecto(Long proyectoId) {
        return cotizacionRepository.findByProyectoUniqueID(proyectoId);
    }

    public List<Cotizacion> getCotizacionesByEstado(String estado) {
        return cotizacionRepository.findByEstado(estado);
    }
}