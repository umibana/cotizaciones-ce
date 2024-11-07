package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "proyecto")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",columnDefinition = "serial")

    private Long idProyecto;

    public String nombre;

    public String direccion;

    public String descripcion;

    public String estado;

    @Column(name = "id_cliente")
    public Long idCliente;
}
