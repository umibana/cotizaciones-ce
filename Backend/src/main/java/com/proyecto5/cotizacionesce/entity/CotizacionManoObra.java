package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cotizacion_mano_obra")
public class CotizacionManoObra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cotizacion_mano_obra",columnDefinition = "serial")
    private Long id_cotizacion_mano_obra;

    @Column(name = "id_mano_obra")
    private Long idManoObra;

    @Column(name = "id_cotizacion")
    private Long idCotizacion;

    private Integer cantidad;

}
