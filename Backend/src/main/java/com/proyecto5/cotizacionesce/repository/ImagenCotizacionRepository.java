package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.ImagenCotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ImagenCotizacionRepository extends JpaRepository<ImagenCotizacion, Long> {
    List<ImagenCotizacion> findByCotizacionUniqueID(Long cotizacionId);
    List<ImagenCotizacion> findByEstado(String estado);
}