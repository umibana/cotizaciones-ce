package com.proyecto5.cotizacionesce.dto;
import java.util.List;
public class AsignarColaboradoresDTO {
    private List<Long> workerIds; // Lista de IDs de trabajadores a asignar

    // Getter y Setter
    public List<Long> getWorkerIds() {
        return workerIds;
    }

    public void setWorkerIds(List<Long> workerIds) {
        this.workerIds = workerIds;
    }
}
