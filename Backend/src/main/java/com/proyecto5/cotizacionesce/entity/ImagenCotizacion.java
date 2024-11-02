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
    private Long idImagenCotizacion;

    private String linkImagen;
    private LocalDateTime timestamp;

    private Long idCotizacion;

    private String estado;
}