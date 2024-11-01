package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.ProyectoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoUsuarioRepository extends JpaRepository<ProyectoUsuario, Long> {

    List<Proyecto> findByProyectos(Long id_proyecto);
}
