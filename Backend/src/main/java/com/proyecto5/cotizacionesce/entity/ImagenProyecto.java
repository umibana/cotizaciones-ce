package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "imagen_proyecto")
public class ImagenProyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_imagen_proyecto",columnDefinition = "serial")
    private Long idImagenProyecto;

    @Column(name = "link_imagen")
    private String linkImagen;

    private LocalDateTime timestamp;

    @Column(name = "id_proyecto")
    private Long idProyecto;
}
