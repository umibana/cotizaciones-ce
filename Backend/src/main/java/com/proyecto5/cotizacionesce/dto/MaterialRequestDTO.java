package com.proyecto5.cotizacionesce.dto;

public class MaterialRequestDTO {
    private Long idMaterial;
    private Integer cantidad;

    public Long getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(Long idMaterial) {
        this.idMaterial = idMaterial;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}
