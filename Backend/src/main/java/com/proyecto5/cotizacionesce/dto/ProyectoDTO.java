package com.proyecto5.cotizacionesce.dto;

import java.util.Date;
import java.util.List;

public class ProyectoDTO {
    public String nombre;
    public String descripcion;
    public String direccion;
    public Date fechaVisita;
    public String clienteCorreo;
    public String clienteRut;
    public String clienteNombre;
    public String clienteNumero;
    public String clienteDireccion;
    public List<String> imagenes;  // Assume links are sent for now
}
