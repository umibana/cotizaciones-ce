package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "proyecto_user")
public class ProyectoUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proyecto_user",columnDefinition = "serial")
    private Long idProyectoUser;

    @Column(name = "id_proyecto")
    public Long idProyecto;

    @Column(name = "id_user")
    public Long idUser;
}
