package com.proyecto5.cotizacionesce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "proyecto")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proyecto",columnDefinition = "serial")

    private Long idProyecto;

    public String nombre;

    public String direccion;

    public String descripcion;

    public String estado;

    public LocalDate fechaVisita;

    @ElementCollection
    @CollectionTable(name = "proyecto_dias_trabajo", joinColumns = @JoinColumn(name = "id_proyecto"))
    @Column(name = "fecha_dia_trabajo")
    public List<LocalDate> fechaDiasTrabajo;

    @Column(name = "id_cliente")
    public Long idCliente;

    @Column(name = "id_User")
    public Long idUserBase;

}
