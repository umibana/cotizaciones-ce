package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.CotizacionRequestDTO;
import com.proyecto5.cotizacionesce.dto.MaterialRequestDTO;
import com.proyecto5.cotizacionesce.dto.PersonalizadoDTO;
import com.proyecto5.cotizacionesce.entity.Cotizacion;
import com.proyecto5.cotizacionesce.entity.CotizacionMaterial;
import com.proyecto5.cotizacionesce.entity.Personalizado;
import com.proyecto5.cotizacionesce.entity.Proyecto;
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
    @Autowired
    private final ProyectoService proyectoService;


    public Cotizacion createCotizacion(CotizacionRequestDTO request) {
        // Crear cotización
        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setNombre(request.getNombre());
        cotizacion.setDescripcion(request.getDescripcion());
        /*
        cotizacion.setNotas(request.getNotas());
        cotizacion.setCondDePagoAdelantado(String.valueOf(request.getCondPagoAdelantado()));
        cotizacion.setCondDePagoContraEntrega(String.valueOf(request.getCondPagoContraEntrega()));
        cotizacion.setValidezOferta(request.getValidezOferta());
        cotizacion.setPlazoDeEntrega(request.getPlazoDeEntrega());

        if (request.getIdProyecto() != null) {
            Proyecto proyecto = proyectoService.getProyectoById(request.getIdProyecto())
                    .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
            cotizacion.setIdProyecto(proyecto.getIdProyecto()); // Asociar el proyecto a la cotización
        }
         */

        cotizacion.setTimestamp(LocalDateTime.now());
        cotizacion.setIdProyecto(request.getIdProyecto());

        // Guardar cotización para obtener el id
        Cotizacion savedCotizacion = cotizacionRepository.save(cotizacion);
        // Creo tablas intermedia para saber que material y su cantidad
        cotizacionMaterialService.createCotizacionMateriales(
                request.getMaterials(),
                savedCotizacion.getId_Cotizacion()
        );

        // En caso de tener items personalizados, se crearan con el método
        personalizadoService.createPersonalizados(
                request.getExtraItems(),
                savedCotizacion.getId_Cotizacion()
        );

        //en este punto se debe ejecutar estadoRevision del service de proyecto
        proyectoService.estadoRevision(request.getIdProyecto());

        return savedCotizacion;
    }

    public Cotizacion updateCotizacion(Long id, Cotizacion cotizacion) {
        return cotizacionRepository.findById(id)
                .map(existing -> {
                    existing.setValidezOferta(cotizacion.getValidezOferta());
                    existing.setPrecioTentativo(cotizacion.getPrecioTentativo());
                    existing.setCondDePagoAdelantado(cotizacion.getCondDePagoAdelantado());
                    existing.setCondDePagoContraEntrega(cotizacion.getCondDePagoContraEntrega());
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

    public Cotizacion getCotizacionByProyecto(Long id_Proyecto) {
        return cotizacionRepository.findByIdProyecto(id_Proyecto);
    }

    public List<Cotizacion> getCotizacionesByEstado(String estado) {
        return cotizacionRepository.findByEstado(estado);
    }
}