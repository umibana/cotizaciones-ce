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
    private Long uniqueID;

    private Integer validezOferta;
    private String condDePago;

    private Double precioTentativo;

    private LocalDateTime timestamp;

    private Integer plazoDeEntrega;

    private String notas;

    @ManyToOne
    @JoinColumn(name = "id_proyecto")
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private User user;

    private Double porcentaje;
    private String estado;

    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL)
    private List<ImagenCotizacion> imagenes;

    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL)
    private List<CotizacionMaterial> materiales;

    @OneToMany(mappedBy = "cotizacion", cascade = CascadeType.ALL)
    private List<Personalizado> personalizados;
}