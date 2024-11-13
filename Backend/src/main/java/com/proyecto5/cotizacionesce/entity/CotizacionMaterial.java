package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cotizacion_material")
public class CotizacionMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material_cotizacion",columnDefinition = "serial")
    private Long id_material_cotizacion;

    @Column(name = "id_material")
    private Long idMaterial;

    @Column(name = "id_cotizacion")
    private Long idCotizacion;

    private Integer cantidad;

}
