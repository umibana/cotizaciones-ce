package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public List<Cliente> getClientes(){
        return (List<Cliente>) clienteRepository.findAll();
    }
    public Cliente createCliente(String nombre, String rut, String telefono, String direccion, String email) {
        Cliente cliente = new Cliente();
        cliente.setNombre(nombre);
        cliente.setRut(rut);
        cliente.setTelefono(telefono);
        cliente.setDireccion(direccion);
        cliente.setEmail(email);
        return clienteRepository.save(cliente);
    }
}
