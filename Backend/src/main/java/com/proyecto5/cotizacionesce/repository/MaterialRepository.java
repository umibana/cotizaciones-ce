package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findByNombreContainingIgnoreCase(String nombre);
    Optional<Material> findByNombre(String nombre);
}