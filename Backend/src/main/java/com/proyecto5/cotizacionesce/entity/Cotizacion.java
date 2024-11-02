package com.proyecto5.cotizacionesce.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cotizacion")
public class Cotizacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCotizacion;

    private Integer validezOferta;
    private String condDePago;

    private Double precioTentativo;

    private LocalDateTime timestamp;

    private Integer plazoDeEntrega;

    private String notas;

    private Long idProyecto;

    private Long idCliente;

    private Double porcentaje;
    private String estado;

}