package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Cotizacion;
import com.proyecto5.cotizacionesce.repository.CotizacionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CotizacionServiceTest {
/*
    @InjectMocks
    private CotizacionService cotizacionService;

    @Mock
    private CotizacionRepository cotizacionRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateCotizacion() {
        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setValidezOferta(15);
        cotizacion.setPrecioTentativo(15000.0);
        cotizacion.setCondDePago("Primer pago 70% y segundo 30%");
        cotizacion.setPlazoDeEntrega(7);
        cotizacion.setNotas("No se arregla pared por falta de seguridad");
        cotizacion.setPorcentaje(20.0);
        cotizacion.setEstado("Sin asignar");
        cotizacion.setIdProyecto(1L);
        cotizacion.setIdCliente(2L);

        when(cotizacionRepository.save(any(Cotizacion.class))).thenReturn(cotizacion);

        Cotizacion resultado = cotizacionService.createCotizacion(cotizacion);

        assertNotNull(resultado);
        assertEquals(15, resultado.getValidezOferta());
        verify(cotizacionRepository, times(1)).save(cotizacion);
    }

    @Test
    void testUpdateCotizacion() {
        Cotizacion cotizacionExistente = new Cotizacion(1L, 30, "Primer pago 60% y segundo 40%", 14, 350000.0, "Piso en mal estado", 20.0, "En desarrollo", 1L, 2L, LocalDateTime.now());
        Cotizacion cotizacionActualizada = new Cotizacion(1L, 30, "Primer pago 60% y segundo 40%", 14, 350000.0, "Piso en mal estado", 20.0, "Finalizado", 1L, 2L, LocalDateTime.now());

        when(cotizacionRepository.findById(1L)).thenReturn(Optional.of(cotizacionExistente));
        when(cotizacionRepository.save(cotizacionExistente)).thenReturn(cotizacionActualizada);

        Cotizacion resultado = cotizacionService.updateCotizacion(1L, cotizacionActualizada);

        assertNotNull(resultado);
        assertEquals("Finalizado", resultado.getEstado());
        verify(cotizacionRepository, times(1)).findById(1L);
        verify(cotizacionRepository, times(1)).save(cotizacionExistente);
    }

    @Test
    void testDeleteCotizacion() {
        Long id = 1L;
        doNothing().when(cotizacionRepository).deleteById(id);

        cotizacionService.deleteCotizacion(id);

        verify(cotizacionRepository, times(1)).deleteById(id);
    }

    @Test
    void testGetCotizacion() {
        Cotizacion cotizacion = new Cotizacion(1L, 30, "Paga 50% y luego 50%", 14, 15000.0, "Piso en mal estado", 10.5, "En revisión", 1L, 2L, LocalDateTime.now());
        when(cotizacionRepository.findById(1L)).thenReturn(Optional.of(cotizacion));

        Cotizacion resultado = cotizacionService.getCotizacion(1L);

        assertNotNull(resultado);
        assertEquals(1L, resultado.getIdCotizacion());
        verify(cotizacionRepository, times(1)).findById(1L);
    }

    @Test
    void testGetCotizacionByEstado() {
        Cotizacion cotizacion1 = new Cotizacion(1L, 30, "Paga 50% y luego 50%", 10, 15000.0, "Piso en mal estado", 20.0, "En revisión", 2L, 2L, LocalDateTime.now());
        Cotizacion cotizacion2 = new Cotizacion(2L, 15, "Paga 50% y luego 50%", 7, 20000.0, "Piso en mal estado", 20.0, "En revisión", 3L, 3L, LocalDateTime.now());

        when(cotizacionRepository.findByEstado("En revisión")).thenReturn(Arrays.asList(cotizacion1, cotizacion2));

        List<Cotizacion> resultado = cotizacionService.getCotizacionesByEstado("En revisión");

        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("En revisión", resultado.get(0).getEstado());
        assertEquals("En revisión", resultado.get(1).getEstado());

        verify(cotizacionRepository, times(1)).findByEstado("En revisión");
    }

    @Test
    void testGetCotizacionByProyecto() {
        Cotizacion cotizacion1 = new Cotizacion(1L, 30, "Paga 50% y luego 50%", 10, 15000.0, "Piso en mal estado", 20.0, "En revisión", 2L, 2L, LocalDateTime.now());
        Cotizacion cotizacion2 = new Cotizacion(2L, 15, "Paga 50% y luego 50%", 7, 20000.0, "Piso en mal estado", 20.0, "En revisión", 2L, 3L, LocalDateTime.now());

        when(cotizacionRepository.findByIdProyecto(2L)).thenReturn(Arrays.asList(cotizacion1, cotizacion2));

        List<Cotizacion> resultado = cotizacionService.getCotizacionesByProyecto(2L);

        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals(2L, resultado.get(0).getIdProyecto());
        assertEquals(2L, resultado.get(1).getIdProyecto());

        verify(cotizacionRepository, times(1)).findByIdProyecto(2L);
    }


*/
}
