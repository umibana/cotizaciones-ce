package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.dto.MaterialRequestDTO;
import com.proyecto5.cotizacionesce.entity.Material;
import com.proyecto5.cotizacionesce.repository.CotizacionMaterialRepository;
import com.proyecto5.cotizacionesce.repository.MaterialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class MaterialService {
    private final MaterialRepository materialRepository;
    private final CotizacionMaterialRepository cotizacionMaterialRepository;

    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    public Material crearMaterial(MaterialRequestDTO materialDTO) {
        Material material = new Material();
        material.setNombre(materialDTO.getNombre());
        material.setPrecio(materialDTO.getPrecio());
        material.setDescripcion(materialDTO.getDescripcion());
        // Set other properties as needed
        return materialRepository.save(material);
    }

    public Material updateMaterial(Long id, Material material) {
        return materialRepository.findById(id)
                .map(existing -> {
                    existing.setNombre(material.getNombre());
                    existing.setDescripcion(material.getDescripcion());
                    existing.setPrecio(material.getPrecio());
                    return materialRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Material no encontrado"));
    }

    public void deleteMaterial(Long id) {
        materialRepository.deleteById(id);
    }

    public List<Material> searchMaterialesByNombre(String nombre) {
        return materialRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Material getMaterial(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material no encontrado"));
    }

    public List<Material> getAllmaterial() {
        return materialRepository.findAll();
    }

    public List<Map<String, Object>> getMaterialesByCotizacionId(Long cotizacionId) {
        return cotizacionMaterialRepository.findMaterialesByCotizacionId(cotizacionId);
    }
}
