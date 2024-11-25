package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ProyectoDTO;
import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.ProyectoUser;
import com.proyecto5.cotizacionesce.entity.User;
import com.proyecto5.cotizacionesce.repository.ClienteRepository;
import com.proyecto5.cotizacionesce.repository.ProyectoRepository;
import com.proyecto5.cotizacionesce.repository.ProyectoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final ClienteRepository clienteRepository;
    private final ProyectoUserRepository proyectoUserRepository;

    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ImagenCotizacionService imagenCotizacionService;

    public List<Proyecto> getProyectos(){
        return(List<Proyecto>) proyectoRepository.findAll();
    }
    public Optional<Proyecto> getProyectoById(Long idProyecto) {
        return proyectoRepository.findById(idProyecto);
    }



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
        proyecto.setEstado(proyectoDTO.estado);
        proyecto.setFechaVisita(proyectoDTO.fechaVisita);
        proyecto.setIdCliente(cliente.getUniqueID());

        return proyectoRepository.save(proyecto);
    }



    public Proyecto estadoRevision(Proyecto unProyecto){
        unProyecto.setIdProyecto(unProyecto.getIdProyecto());
        unProyecto.setNombre(unProyecto.getNombre());
        unProyecto.setDireccion(unProyecto.getDireccion());
        unProyecto.setDescripcion(unProyecto.getDescripcion());
        unProyecto.setEstado("En Revision de cotizacion");
        unProyecto.setFechaVisita(unProyecto.getFechaVisita());
        unProyecto.setIdCliente(unProyecto.getIdCliente());
        unProyecto.setIdUser(unProyecto.getIdUser());
        return unProyecto;
    }


    public void asignarColaboradoresAlProyecto(Long projectId, List<Long> workerIds){

        for (Long workerId : workerIds){
            ProyectoUser proyectoUser = new ProyectoUser();
            proyectoUser.setIdProyecto(projectId);
            proyectoUser.setIdUser(workerId);
            proyectoUserRepository.save(proyectoUser);
        }

        Proyecto proyecto = proyectoRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));

        proyecto.setEstado("Asignado");
        proyectoRepository.save(proyecto);
    }



}
