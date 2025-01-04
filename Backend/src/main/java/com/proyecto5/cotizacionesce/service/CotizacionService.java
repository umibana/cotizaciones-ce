package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.CotizacionRequestDTO;
import com.proyecto5.cotizacionesce.dto.ManoObraRequestDTO;
import com.proyecto5.cotizacionesce.dto.MaterialRequestDTO;
import com.proyecto5.cotizacionesce.dto.PersonalizadoDTO;
import com.proyecto5.cotizacionesce.entity.*;
import com.proyecto5.cotizacionesce.repository.CotizacionMaterialRepository;
import com.proyecto5.cotizacionesce.repository.CotizacionRepository;
import com.proyecto5.cotizacionesce.repository.PersonalizadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    @Autowired
    private final ManoObraService manoObraService;
    @Autowired
    private final MaterialService materialService;
    private final CotizacionManoObraService cotizacionManoObraService;

    public Cotizacion createCotizacion(CotizacionRequestDTO request) {
        // Crear cotización

        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setNombre(request.getNombre());
        cotizacion.setDescripcion(request.getDescripcion());
        cotizacion.setNotas(request.getNotas());
        cotizacion.setCondPagoAdelantado(String.valueOf(request.getCondDePagoAdelantado()));
        cotizacion.setCondPagoContraEntrega(String.valueOf(request.getCondDePagoContraEntrega()));
        cotizacion.setValidezOferta(request.getValidezOferta());
        cotizacion.setPlazoDeEntrega(request.getPlazoDeEntrega());
        cotizacion.setPorcentaje(request.getPorcentaje());

        if (request.getIdProyecto() != null) {
            Proyecto proyecto = proyectoService.getProyectoById(request.getIdProyecto())
                    .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
            cotizacion.setIdProyecto(proyecto.getIdProyecto()); // Asociar el proyecto a la cotización
        }

        cotizacion.setTimestamp(LocalDateTime.now());
        cotizacion.setIdProyecto(request.getIdProyecto());

        // Guardar cotización para obtener el id
        Cotizacion savedCotizacion = cotizacionRepository.save(cotizacion);
        // Si es material nuevo, lo creo.

        List<MaterialRequestDTO> processedMaterials = request.getMaterials().stream()
                .peek(materialDTO -> {
                    if (materialDTO.getIdMaterial() == null) {
                        System.out.println("Material nuevo - ID: " + materialDTO.getIdMaterial()
                                + ", Nombre: " + materialDTO.getNombre()
                                + ", Precio: " + materialDTO.getPrecio()
                                + ", Cantidad: " + materialDTO.getCantidad());

                        Material newMaterial = materialService.crearMaterial(materialDTO);
                        materialDTO.setIdMaterial(newMaterial.getIdMaterial());
                    }
                })
                .collect(Collectors.toList());

        // Now create the intermediate table entries with all materials (new and
        // existing)
        cotizacionMaterialService.createCotizacionMateriales(
                processedMaterials,
                savedCotizacion.getId_Cotizacion());

        // En caso de tener items personalizados, se crearan con el método
        personalizadoService.createPersonalizados(
                request.getExtraItems(),
                savedCotizacion.getId_Cotizacion());


        List<ManoObraRequestDTO> manoObraProcesada = request.getManoObras().stream()
                .peek(manoObraDTO -> {
                    if (manoObraDTO.getIdManoObra() == null) {
                        System.out.println("Material nuevo - ID: " + manoObraDTO.getIdManoObra()
                                + ", Nombre: " + manoObraDTO.getNombreManoObra()
                                + ", Nombre (eliminar si funcionan ambos): " + manoObraDTO.getNombreMaterial()
                                + ", area : " + manoObraDTO.getAreaTrabajarM2()
                                + ", costo : " + manoObraDTO.getCostoUnitario()
                                + ", valor m2 : " + manoObraDTO.getValorPorM2()
                                + ", id: " + manoObraDTO.getIdManoObra());

                        ManoObra newManoObra = manoObraService.crearManoObra(manoObraDTO);
                        manoObraDTO.setIdManoObra(newManoObra.getIdManoObra());
                    }
                })
                .toList();

        // Ahora creo las tablas intermedias de mano de obra y cotización
        cotizacionManoObraService.createCotizacionManoObra(
                manoObraProcesada,
                savedCotizacion.getId_Cotizacion());

        // Actualizar el estado del proyecto
        proyectoService.estadoRevision(request.getIdProyecto());

        return savedCotizacion;
    }

    public Cotizacion updateCotizacion(Long id, Cotizacion cotizacion) {
        return cotizacionRepository.findById(id)
                .map(existing -> {
                    existing.setValidezOferta(cotizacion.getValidezOferta());
                    existing.setPrecioTentativo(cotizacion.getPrecioTentativo());
                    existing.setCondPagoAdelantado(cotizacion.getCondPagoAdelantado());
                    existing.setCondPagoContraEntrega(cotizacion.getCondPagoContraEntrega());
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
        return cotizacionRepository.findTopByProyectoIdOrderByTimestampDesc(id_Proyecto);
    }

    public List<Cotizacion> getCotizacionesByEstado(String estado) {
        return cotizacionRepository.findByEstado(estado);
    }
}