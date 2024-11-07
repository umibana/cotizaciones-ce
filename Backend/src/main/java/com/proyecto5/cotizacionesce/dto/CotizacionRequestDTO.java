package com.proyecto5.cotizacionesce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class CotizacionRequestDTO {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    private Long idProyecto;  // This will come from the first fetch

    @NotEmpty(message = "Debe incluir al menos un material")
    private List<MaterialRequestDTO> materials;

    private List<PersonalizadoDTO> extraItems;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdProyecto() {
        return idProyecto;
    }

    public void setIdProyecto(Long idProyecto) {
        this.idProyecto = idProyecto;
    }

    public List<MaterialRequestDTO> getMaterials() {
        return materials;
    }

    public void setMaterials(List<MaterialRequestDTO> materials) {
        this.materials = materials;
    }

    public List<PersonalizadoDTO> getExtraItems() {
        return extraItems;
    }

    public void setExtraItems(List<PersonalizadoDTO> extraItems) {
        this.extraItems = extraItems;
    }
}