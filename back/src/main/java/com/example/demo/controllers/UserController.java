package com.example.demo.controllers;

import com.example.demo.JWT.JwtUtil;
import com.example.demo.dto.UserResponseDTO;
import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Lazy
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User userData) {
        try {
            User registeredUser = userService.registerUser(userData);
            return ResponseEntity.ok(new UserResponseDTO(registeredUser.getId(), registeredUser.getUsername()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User userData) {
        User loggedInUser = userService.loginUser(userData.getUsername(), userData.getPassword());
        if (loggedInUser != null) {
            String token = jwtUtil.generateToken(loggedInUser.getUsername());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
