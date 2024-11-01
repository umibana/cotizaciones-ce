package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.ImagenProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenProyectoRepository extends JpaRepository<ImagenProyecto, Long> {
}
