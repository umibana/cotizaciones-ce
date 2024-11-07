package com.proyecto5.cotizacionesce.service;
import com.proyecto5.cotizacionesce.entity.ImagenCotizacion;
import com.proyecto5.cotizacionesce.repository.ImagenCotizacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ImagenCotizacionService {
    private final ImagenCotizacionRepository imagenCotizacionRepository;

    public void createImagenCotizaciones(Long proyectoId, List<String> imageUrls) {
        for (String imageUrl : imageUrls) {
            ImagenCotizacion imagen = new ImagenCotizacion();
            imagen.setLinkImagen(imageUrl);
            imagen.setEstado("active");
            imagen.setIdCotizacion(proyectoId);
            imagen.setTimestamp(LocalDateTime.now());
            imagenCotizacionRepository.save(imagen);
        }
    }

    public ImagenCotizacion saveImagen(ImagenCotizacion imagen) {
        imagen.setTimestamp(LocalDateTime.now());
        return imagenCotizacionRepository.save(imagen);
    }

    public void deleteImagen(Long id) {
        imagenCotizacionRepository.deleteById(id);
    }

    public List<ImagenCotizacion> getImagenesByCotizacion(Long cotizacionId) {
        return imagenCotizacionRepository.findByIdCotizacion(cotizacionId);
    }

    public ImagenCotizacion updateEstado(Long id, String estado) {
        return imagenCotizacionRepository.findById(id)
                .map(imagen -> {
                    imagen.setEstado(estado);
                    return imagenCotizacionRepository.save(imagen);
                })
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada"));
    }
}