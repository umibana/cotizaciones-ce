package com.proyecto5.cotizacionesce.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ManoObraRequestDTO {

    private Long idManoObra;
    private String nombreManoObra;
    private Integer areaTrabajarM2;
    private Integer costoUnitario;
    private Integer valorPorM2;
    private Long idCotizacion;

    // Getters y Setters
    public String getNombreMaterial() {
        return nombreManoObra;
    }
    public void setNombreMaterial(String nombreMaterial) {
        this.nombreManoObra = nombreMaterial;
    }

    public Integer getAreaTrabajarM2() {
        return areaTrabajarM2;
    }
    public void setAreaTrabajarM2(Integer areaTrabajarM2) {
        this.areaTrabajarM2 = areaTrabajarM2;
    }

    public Integer getCostoUnitario() {
        return costoUnitario;
    }
    public void setCostoMaterialUnitario(Integer costoUnitario) {
        this.costoUnitario = costoUnitario;
    }

    public Integer getValorPorM2() {
        return valorPorM2;
    }
    public void setValorPorM2(Integer valorPorM2) {
        this.valorPorM2 = valorPorM2;
    }


}
