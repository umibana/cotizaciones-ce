package com.proyecto5.cotizacionesce.controllers;

import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;


    @GetMapping("")
    public ResponseEntity<List<Cliente>> listarClientes(){
        List<Cliente> listaClientes=clienteService.getClientes();
        return ResponseEntity.ok(listaClientes);
    }

    @GetMapping("/{uniqueID}")
    public ResponseEntity<Optional<Cliente>> obtenerClientePorId(@PathVariable Long uniqueID) {
        Optional<Cliente> cliente = clienteService.getClienteById(uniqueID);
        return ResponseEntity.ok(cliente);
    }
}
