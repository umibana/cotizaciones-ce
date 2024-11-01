package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.repository.ProyectoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProyectoService {

    private ProyectoRepository proyectoRepository;

    public List<Proyecto> getProyectos(){
        return(List<Proyecto>) proyectoRepository.findAll();
    }
}
