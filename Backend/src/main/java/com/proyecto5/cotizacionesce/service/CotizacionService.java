package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.CotizacionRequestDTO;
import com.proyecto5.cotizacionesce.dto.MaterialRequestDTO;
import com.proyecto5.cotizacionesce.dto.PersonalizadoDTO;
import com.proyecto5.cotizacionesce.entity.Cotizacion;
import com.proyecto5.cotizacionesce.entity.CotizacionMaterial;
import com.proyecto5.cotizacionesce.entity.Personalizado;
import com.proyecto5.cotizacionesce.repository.CotizacionMaterialRepository;
import com.proyecto5.cotizacionesce.repository.CotizacionRepository;
import com.proyecto5.cotizacionesce.repository.PersonalizadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CotizacionService {
    @Autowired
    private final CotizacionRepository cotizacionRepository;
    @Autowired
    private final CotizacionMaterialService cotizacionMaterialService;
    @Autowired
    private final PersonalizadoService personalizadoService;


    public Cotizacion createCotizacion(CotizacionRequestDTO request) {
        // Crear cotización
        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setNombre(request.getNombre());
        cotizacion.setDescripcion(request.getDescripcion());
        cotizacion.setIdProyecto(request.getIdProyecto());
        cotizacion.setTimestamp(LocalDateTime.now());

        // Guardar cotización para obtener el id
        Cotizacion savedCotizacion = cotizacionRepository.save(cotizacion);
        // Creo tablas intermedia para saber que material y su cantidad
        cotizacionMaterialService.createCotizacionMateriales(
                request.getMaterials(),
                savedCotizacion.getIdCotizacion()
        );

        // En caso de tener items personalizados, se crearan con el método
        personalizadoService.createPersonalizados(
                request.getExtraItems(),
                savedCotizacion.getIdCotizacion()
        );

        return savedCotizacion;
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

    public List<Cotizacion> getCotizacionesByProyecto(Long idProyecto) {
        return cotizacionRepository.findByIdProyecto(idProyecto);
    }

    public List<Cotizacion> getCotizacionesByEstado(String estado) {
        return cotizacionRepository.findByEstado(estado);
    }
}