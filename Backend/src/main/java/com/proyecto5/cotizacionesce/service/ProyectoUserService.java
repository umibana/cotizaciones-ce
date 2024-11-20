package com.proyecto5.cotizacionesce.service;


import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.ProyectoUser;
import com.proyecto5.cotizacionesce.entity.User;
import com.proyecto5.cotizacionesce.repository.ProyectoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProyectoUserService {

    private final ProyectoUserRepository proyectoUserRepository;

    public List<ProyectoUser> getProyectosUsers(){
        return(List<ProyectoUser>) proyectoUserRepository.findAll();
    }

    public List<ProyectoUser> getProyectoAsignados(Long id_user){
        List<ProyectoUser> proyectos = proyectoUserRepository.findByIdUser(id_user);
        return proyectos;
    }
}
