package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.CotizacionMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CotizacionMaterialRepository extends JpaRepository<CotizacionMaterial, Long> {
    List<CotizacionMaterial> findByCotizacionUniqueID(Long cotizacionId);
    List<CotizacionMaterial> findByMaterialUniqueID(Long materialId);
}