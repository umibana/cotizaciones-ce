package com.proyecto5.cotizacionesce.repository;// CotizacionRepository.java
import com.proyecto5.cotizacionesce.entity.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
    List<Cotizacion> findByEstado(String estado);
    List<Cotizacion> findByIdProyecto(Long id_Proyecto);
}