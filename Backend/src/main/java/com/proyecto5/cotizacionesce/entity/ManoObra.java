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

    @Column(name = "costo_unitario", nullable = false)
    private Integer costoUnitario;

    @Column(name = "valor_por_m2", nullable = false)
    private Integer valorPorM2;

}
