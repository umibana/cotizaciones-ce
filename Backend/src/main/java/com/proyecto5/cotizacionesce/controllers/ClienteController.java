package com.proyecto5.cotizacionesce.controllers;

import com.proyecto5.cotizacionesce.entity.Cliente;
import com.proyecto5.cotizacionesce.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ClienteController {

    ClienteService clienteService;

    @GetMapping("")
    public ResponseEntity<List<Cliente>> listarClientes(){
        List<Cliente> listaClientes=clienteService.getClientes();
        return ResponseEntity.ok(listaClientes);
    }
}
