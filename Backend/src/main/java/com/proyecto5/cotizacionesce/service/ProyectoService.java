package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.ProyectoDTO;
import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.ProyectoUser;
import com.proyecto5.cotizacionesce.entity.User;
import com.proyecto5.cotizacionesce.repository.ClienteRepository;
import com.proyecto5.cotizacionesce.repository.ProyectoRepository;
import com.proyecto5.cotizacionesce.repository.ProyectoUserRepository;
import com.proyecto5.cotizacionesce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final UserRepository userRepository;
    private final ClienteRepository clienteRepository;
    private final ProyectoUserRepository proyectoUserRepository;

    @Autowired
    private ClienteService clienteService;
    @Autowired
    private ProyectoUserService proyectoUserService;
    @Autowired
    private ImagenCotizacionService imagenCotizacionService;
    @Autowired
    private UserService userService;
    @Autowired
    private SendGridService sendGridService;

    public List<Proyecto> getProyectos() {
        return (List<Proyecto>) proyectoRepository.findAll();
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
                proyectoDTO.clienteCorreo);

        if (cliente.getUniqueID() == null) {
            throw new RuntimeException("El cliente no se creó correctamente.");
        }

        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(proyectoDTO.nombre);
        proyecto.setDescripcion(proyectoDTO.descripcion);
        proyecto.setDireccion(proyectoDTO.direccion);
        proyecto.setEstado(proyectoDTO.estado);
        proyecto.setFechaVisita(proyectoDTO.fechaVisita);
        proyecto.setIdUserBase(proyectoDTO.idCreador);
        proyecto.setIdCliente(cliente.getUniqueID());

        return proyectoRepository.save(proyecto);
    }

    public Proyecto estadoRevision(Long idProyecto) {

        Proyecto proyecto = proyectoRepository.findByIdProyecto(idProyecto)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        if ("Preparacion cotizacion".equals(proyecto.getEstado())) {
            proyecto.setEstado("Cotizado");
            proyecto = proyectoRepository.save(proyecto);
        } else {
            throw new RuntimeException("El proyecto no estaba en estado 'Preparacion cotizacion'");
        }

        return proyecto;
    }

    // borrador de cambio de estado a "aprobado"
    public Proyecto estadoAprobado(Long idProyecto) {
        Proyecto proyecto = proyectoRepository.findByIdProyecto(idProyecto)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        if ("Cotizado".equals(proyecto.getEstado())) {
            proyecto.setEstado("Aprobado");
            proyecto = proyectoRepository.save(proyecto);
        } else {
            throw new RuntimeException("El proyecto no estaba en estado 'Cotizado'");
        }
        return proyecto;
    }

    // borrador de cambiar estado a "terminado"
    public Proyecto estadoTerminado(Long idProyecto) {
        Proyecto proyecto = proyectoRepository.findByIdProyecto(idProyecto)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        if ("Aprobado".equals(proyecto.getEstado())) {
            proyecto.setEstado("Terminado");
            proyecto = proyectoRepository.save(proyecto);
        } else {
            throw new RuntimeException("El proyecto no estaba en estado 'Aprobado'");
        }
        return proyecto;
    }

    // borrador de cambio de estado "rechazado"
    public Proyecto estadoRechazado(Long idProyecto) {
        Proyecto proyecto = proyectoRepository.findByIdProyecto(idProyecto)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        if ("Cotizado".equals(proyecto.getEstado())) {
            proyecto.setEstado("Rechazado");
            proyecto = proyectoRepository.save(proyecto);
        } else {
            throw new RuntimeException("El proyecto no estaba en estado 'Preparacion cotizacion'");
        }
        return proyecto;
    }

    public Proyecto estadoEliminado(Long idProyecto) {
        Proyecto proyecto = proyectoRepository.findByIdProyecto(idProyecto)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        proyecto.setEstado("Eliminado");
        proyecto = proyectoRepository.save(proyecto);
        return proyecto;
    }

    public void asignarColaboradoresAlProyecto(Long projectId, List<Long> workerIds) {
        Proyecto proyecto = proyectoRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));

        for (Long workerId : workerIds) {
            ProyectoUser proyectoUser = new ProyectoUser();
            proyectoUser.setIdProyecto(projectId);
            proyectoUser.setIdUser(workerId);
            proyectoUserRepository.save(proyectoUser);

            User user = userService.getUserById(workerId)
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

            sendGridService.sendEmail(
                    user.getEmail(),
                    "Se le ha asignado el proyecto " + proyecto.getNombre(),
                    String.format(
                            "Se le ha asignado el proyecto %s ubicado en %s con fecha de visita %s y descripcion %s",
                            proyecto.getNombre(),
                            proyecto.getDireccion(),
                            proyecto.getFechaVisita(),
                            proyecto.getDescripcion()));
        }

        proyecto.setEstado("Preparacion cotizacion");
        proyectoRepository.save(proyecto);
    }

    public List<Proyecto> listaProyectosAsignadosPorEmail(String email) {
        Optional<User> usuario = userRepository.findUserByEmail(email);
        Long id_usuario = usuario.get().getIdUser();
        List<ProyectoUser> ListaproyectosUser = proyectoUserService.getProyectoAsignados(id_usuario);
        List<Proyecto> ListaProyectos = new ArrayList<>();
        for (ProyectoUser proyectoUser : ListaproyectosUser) {
            Optional<Proyecto> proyectoAdd = proyectoRepository.findById(proyectoUser.idProyecto);
            // Agregar el proyecto a la lista si existe
            proyectoAdd.ifPresent(ListaProyectos::add);
        }
        return ListaProyectos;
    }

}
