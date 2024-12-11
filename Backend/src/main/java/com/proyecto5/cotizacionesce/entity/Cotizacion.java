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
    @Column(name = "id_cotizacion",columnDefinition = "serial")
    private Long id_Cotizacion;

    private String nombre;
    private String Apellido;

    private String descripcion;

    private Integer validezOferta;
    @Column(name = "cond_pago_adelantado")
    private String condPagoAdelantado; // Ejemplo 60%

    @Column(name = "cond_pago_contra")
    private String condPagoContraEntrega; //Ejemplo 40%

    private Integer plazoDeEntrega;

    private Double precioTentativo;

    private String notas;

    private Integer porcentaje; //Se refiere a la metrica de % de utilidad

    private String estado; //En revision y Aprobada

    private Long idProyecto;

    private Long id_Cliente;

    private Long idUser; //ID del trabajador que hizo la cotizacion

    private LocalDateTime timestamp;

}