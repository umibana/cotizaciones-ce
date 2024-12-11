package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {


    //idea: buscar por query?
    Optional<Proyecto> findByIdProyecto(Long idProyecto);
}
