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
    @Column(name = "id")
    private Long idCotizacion;

    private String nombre;

    private String descripcion;

    private Integer validezOferta;

    private String condDePago;

    private Integer plazoDeEntrega;

    private Double precioTentativo;

    private String notas;

    private Double porcentaje;

    private String estado;

    private Long idProyecto;

    private Long idCliente;

    private Long idUser;

    private LocalDateTime timestamp;

}