package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "proyecto_usuario")
public class ProyectoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_proyecto_usuario;

    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    private List<Proyecto> proyectos;
}
