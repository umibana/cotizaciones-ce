package com.proyecto5.cotizacionesce.entity;// Material.java
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "material")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_material;

    private String nombre;
    private String descripcion;
    private Double costo;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL)
    private List<CotizacionMaterial> cotizaciones;
}