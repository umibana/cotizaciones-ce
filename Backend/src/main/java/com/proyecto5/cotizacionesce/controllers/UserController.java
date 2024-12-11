package com.proyecto5.cotizacionesce.controllers;

import com.proyecto5.cotizacionesce.entity.User;
import com.proyecto5.cotizacionesce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    @PostMapping("/crear")
    public ResponseEntity<Map<String, String>> createUser(@Valid @RequestBody User user) {
           try {
               User createdUser = userService.createUser(user);
               Map<String, String> response = new HashMap<>();
               response.put("message", "Usuario " + createdUser.getIdUser().toString() + " creada exitosamente");
               return ResponseEntity.ok(response);

           }catch (Exception e){
               Map<String, String> errorResponse = new HashMap<>();
               errorResponse.put("message", "Error al crear el usuario: " + e.getMessage());
               return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
           }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/idporemail")
    public ResponseEntity<Long> getIdByEmail(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        Long idUser = userService.getIdByEmail(email);
        return ResponseEntity.ok(idUser);
    }
}
