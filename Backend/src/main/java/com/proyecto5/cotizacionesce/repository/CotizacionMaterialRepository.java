package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.CotizacionMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface CotizacionMaterialRepository extends JpaRepository<CotizacionMaterial, Long> {

    @Query("SELECT new map(cm.cantidad as cantidad, " +
            "m.idMaterial as materialId, " +
            "m.nombre as nombre, " +
            "m.descripcion as descripcion, " +
            "m.precio as precio) " +
            "FROM CotizacionMaterial cm " +
            "INNER JOIN Material m ON cm.idMaterial = m.idMaterial " +
            "WHERE cm.idCotizacion = :cotizacionId")
    default List<Map<String, Object>> findMaterialesByCotizacionId(@Param("cotizacionId") Long cotizacionId) {
        List<Map<String, Object>> results = findMaterialesByCotizacionIdInternal(cotizacionId);
        System.out.println("Query results for cotizacionId " + cotizacionId + ": " + results);
        return results;
    }

    @Query("SELECT new map(cm.cantidad as cantidad, " +
            "m.idMaterial as materialId, " +
            "m.nombre as nombre, " +
            "m.descripcion as descripcion, " +
            "m.precio as precio) " +
            "FROM CotizacionMaterial cm " +
            "INNER JOIN Material m ON cm.idMaterial = m.idMaterial " +
            "WHERE cm.idCotizacion = :cotizacionId")
    List<Map<String, Object>> findMaterialesByCotizacionIdInternal(@Param("cotizacionId") Long cotizacionId);
}