package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
}
