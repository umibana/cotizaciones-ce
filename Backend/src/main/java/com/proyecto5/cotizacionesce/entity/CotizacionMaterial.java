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
    private Long id_material_cotizacion;

    private Long idMaterial;
    private Long idCotizacion;
    private Integer cantidad;

}
