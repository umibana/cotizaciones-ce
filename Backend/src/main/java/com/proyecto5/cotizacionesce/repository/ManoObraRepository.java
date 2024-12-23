package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.ManoObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManoObraRepository extends JpaRepository<ManoObra, Long> {

    List<ManoObra> findByIdCotizacion(Long idCotizacion);
}
