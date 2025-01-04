package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.CotizacionManoObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CotizacionManoObraRepository extends JpaRepository<CotizacionManoObra, Long> {
    @Query("SELECT new map(cm.cantidad as cantidad, " +
            "m.idManoObra as materialId, " +
            "m.nombreManoObra as nombre, " +
            "m.areaTrabajarM2 as areaTrabajar, " +
            "m.valorPorM2 as valorPorM2," +
            "m.costoUnitario as costoUnitario) " +
            "FROM CotizacionManoObra cm " +
            "INNER JOIN ManoObra m ON cm.idManoObra = m.idManoObra " +
            "WHERE cm.idCotizacion = :cotizacionId")
    List<Map<String, Object>> findManoObraByCotizacionId(@Param("cotizacionId") Long cotizacionId);
}