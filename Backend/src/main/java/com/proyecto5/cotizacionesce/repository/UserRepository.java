package com.proyecto5.cotizacionesce.repository;

import com.proyecto5.cotizacionesce.entity.Proyecto;
import com.proyecto5.cotizacionesce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query(value = "Select p from Proyecto p inner join User u where p.idUser = u.idUser and u.email = :email")
    List<Proyecto> findProyectosByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
