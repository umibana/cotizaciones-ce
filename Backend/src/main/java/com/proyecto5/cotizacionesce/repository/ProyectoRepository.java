package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    List<Proyecto> findByIdUser(Long id_user);
}
