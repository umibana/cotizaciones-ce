package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
