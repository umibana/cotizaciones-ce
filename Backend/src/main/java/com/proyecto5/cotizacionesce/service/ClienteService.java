package com.proyecto5.cotizacionesce.service;

import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;

    public List<Cliente> getClientes(){
        return (List<Cliente>) clienteRepository.findAll();
    }
}
