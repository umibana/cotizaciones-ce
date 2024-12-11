package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {

    @Autowired
    private final ClienteRepository clienteRepository;

    public List<Cliente> getClientes(){
        return (List<Cliente>) clienteRepository.findAll();
    }

    public Optional<Cliente> getClienteById(Long uniqueID) {
        return clienteRepository.findByUniqueID(uniqueID);
    }

    public Cliente createCliente(String nombre, String rut, String telefono, String direccion, String email) {
        Cliente cliente = new Cliente();
        cliente.setNombre(nombre);
        cliente.setRut(rut);
        cliente.setTelefono(telefono);
        cliente.setDireccion(direccion);
        cliente.setEmail(email);

        Cliente savedCliente = clienteRepository.save(cliente);
        System.out.println("Cliente creado con ID: " + savedCliente.getUniqueID());
        return savedCliente;
    }
}
