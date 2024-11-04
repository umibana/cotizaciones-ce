package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;

    public List<Proyecto> getProyectos(){
        return(List<Proyecto>) proyectoRepository.findAll();
    }

    public void createProyecto(Proyecto proyecto){
        proyectoRepository.save(proyecto);
    }
}
