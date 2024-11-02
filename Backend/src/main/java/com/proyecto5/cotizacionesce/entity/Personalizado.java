package com.proyecto5.cotizacionesce.entity;// Personalizado.java
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "personalizado")
public class Personalizado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMaterial;

    private String nombre;
    private String descripcion;
    private Double metros;
    private Double precio;

    private Long idCotizacion;
}