package com.proyecto5.cotizacionesce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CotizacionRequestDTO {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    private Long idProyecto;  // This will come from the first fetch

    @NotEmpty(message = "Debe incluir al menos un material")
    private List<MaterialRequestDTO> materials;

    private List<PersonalizadoDTO> extraItems;

    private String notas;



    @NotNull(message = "El plazo de entrega es obligatorio")
    private Integer plazoDeEntrega;


    @NotNull(message = "La condicion de pago es obligatoria")
    private Integer condPagoAdelantado;

    @NotNull(message = "La condicion de pago es obligatoria")
    private Integer condPagoContraEntrega;

    @NotNull(message = "La validez de la oferta es obligatoria")
    private Integer validezOferta;

    public String getNombre() {
        return nombre;
    }

    public Long getIdProyecto() {
        return idProyecto;
    }

    public void setIdProyecto(Long idProyecto) {
        this.idProyecto = idProyecto;
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

    public void setMaterials(List<MaterialRequestDTO> materials) {
        this.materials = materials;
    }

    public List<MaterialRequestDTO> getMaterials() {
        return materials;
    }

    public List<PersonalizadoDTO> getExtraItems() {
        return extraItems;
    }

    public void setExtraItems(List<PersonalizadoDTO> extraItems) {
        this.extraItems = extraItems;
    }
}