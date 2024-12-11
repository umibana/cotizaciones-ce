package com.proyecto5.cotizacionesce.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ManoObraRequestDTO {

    private Long idManoObra;
    private String nombreManoObra;
    private Integer areaTrabajarM2;
    private Integer rendimientoMaterialM2;
    private Integer costoMaterialUnitario;
    private Integer manoObraPorM2;

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

    public Integer getRendimientoMaterial() {
        return rendimientoMaterialM2;
    }
    public void setRendimientoMaterial(Integer rendimientoMaterial) {
        this.rendimientoMaterialM2 = rendimientoMaterial;
    }

    public Integer getCostoMaterialUnitario() {
        return costoMaterialUnitario;
    }
    public void setCostoMaterialUnitario(Integer costoMaterialUnitario) {
        this.costoMaterialUnitario = costoMaterialUnitario;
    }

    public Integer getManoObraPorM2() {
        return manoObraPorM2;
    }
    public void setManoObraPorM2(Integer manoObraPorM2) {
        this.manoObraPorM2 = manoObraPorM2;
    }


}
