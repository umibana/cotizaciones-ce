package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.ProyectoUsuario;
import com.proyecto5.cotizacionesce.repository.ProyectoUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProyectoUsuarioService {
    private final ProyectoUsuarioRepository proyectoUsuarioRepository;

    public ProyectoUsuario saveImage(ProyectoUsuario imagen){
        return proyectoUsuarioRepository.save(imagen);
    }
}
