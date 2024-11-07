package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ProyectoDTO;
import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;

    public List<Proyecto> getProyectos(){
        return(List<Proyecto>) proyectoRepository.findAll();
    }
    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ImagenCotizacionService imagenCotizacionService;

    public Proyecto saveProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    public Proyecto createProyecto(ProyectoDTO proyectoDTO) {
        Cliente cliente = clienteService.createCliente(
                proyectoDTO.clienteNombre,
                proyectoDTO.clienteRut,
                proyectoDTO.clienteNumero,
                proyectoDTO.clienteDireccion,
                proyectoDTO.clienteCorreo
        );

        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(proyectoDTO.nombre);
        proyecto.setDescripcion(proyectoDTO.descripcion);
        proyecto.setDireccion(proyectoDTO.direccion);
        proyecto.setFechaVisita(proyectoDTO.fechaVisita);
        proyecto.setIdCliente(cliente.getUniqueID());
        Proyecto proyectoNuevo =proyectoRepository.save(proyecto);

        imagenCotizacionService.createImagenCotizaciones(proyecto.getIdProyecto(), proyectoDTO.imagenes);
        return proyectoNuevo;
    }
}

