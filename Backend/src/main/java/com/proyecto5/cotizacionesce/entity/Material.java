package com.proyecto5.cotizacionesce.entity;// Material.java
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material",columnDefinition = "serial")
    private Long idMaterial;

    private String nombre;

    private String descripcion;

    private Double precio;
}