package com.proyecto5.cotizacionesce.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "imagen_cotizacion")
public class ImagenCotizacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_imagen_cotizacion",columnDefinition = "serial")
    private Long idImagenCotizacion;

    @Column(name = "link_imagen")
    private String linkImagen;

    private String estado;

    @Column(name = "id_cotizacion")
    private Long idCotizacion;

    private LocalDateTime timestamp;


}