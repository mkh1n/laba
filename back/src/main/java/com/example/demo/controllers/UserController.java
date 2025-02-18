package com.example.demo.controllers;

import com.example.demo.utils.JwtUtil;
import com.example.demo.dto.UserResponseDTO;
import com.example.demo.models.User;
import com.example.demo.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@Slf4j

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        try {
            List<UserResponseDTO> users= userService.getUsers().stream().map(u -> {
                var userDTO = new UserResponseDTO();
                userDTO.setId(u.getId());
                userDTO.setUsername(u.getUsername());
                return userDTO;
            }).toList();


            return ResponseEntity.ok(users);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            String token = jwtUtil.generateToken(registeredUser.getUsername());

            var response = new UserResponseDTO();
            response.setToken(token);
            response.setId(registeredUser.getId());
            response.setUsername(registeredUser.getUsername());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User authenticatedUser = userService.loginUser(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            String token = jwtUtil.generateToken(authenticatedUser.getUsername());
            log.info(String.valueOf(authenticatedUser.getId()));

            var response = new UserResponseDTO();
            response.setToken(token);
            response.setId(authenticatedUser.getId());
            response.setUsername(authenticatedUser.getUsername());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid login or password");
        }
    }
}
