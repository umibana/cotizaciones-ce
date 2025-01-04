package com.proyecto5.cotizacionesce.repository;// CotizacionRepository.java
import com.proyecto5.cotizacionesce.entity.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
    List<Cotizacion> findByEstado(String estado);
    Cotizacion findByIdProyecto(Long id_Proyecto);

    @Query("SELECT c FROM Cotizacion c WHERE c.idProyecto = :idProyecto ORDER BY c.timestamp DESC")
    Cotizacion findTopByProyectoIdOrderByTimestampDesc(@Param("idProyecto") Long idProyecto);

}