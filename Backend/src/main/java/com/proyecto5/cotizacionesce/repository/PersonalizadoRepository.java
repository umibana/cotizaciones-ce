package com.proyecto5.cotizacionesce.repository;// PersonalizadoRepository.java
import com.proyecto5.cotizacionesce.entity.Personalizado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PersonalizadoRepository extends JpaRepository<Personalizado, Long> {
    List<Personalizado> findByCotizacionUniqueID(Long cotizacionId);
    List<Personalizado> findByNombreContainingIgnoreCase(String nombre);
}