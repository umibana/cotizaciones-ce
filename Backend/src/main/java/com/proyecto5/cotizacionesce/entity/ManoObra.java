package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "mano_obra")
public class ManoObra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idManoObra;

    @Column(name = "nombre_mano_obra", nullable = false)
    private String nombreManoObra;

    @Column(name = "area_trabajar_M2", nullable = false)
    private Integer areaTrabajarM2;

    @Column(name = "rendimiento_material", nullable = false)
    private Integer rendimientoMaterialM2;

    @Column(name = "costo_material_unitario", nullable = false)
    private Integer costoMaterialUnitario;

    @Column(name = "mano_obra_por_m2", nullable = false)
    private Integer manoObraPorM2;

    @Column(name = "id_cotizacion", nullable = false)
    private Long idCotizacion;
}
