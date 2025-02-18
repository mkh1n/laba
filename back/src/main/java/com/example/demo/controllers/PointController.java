package com.example.demo.controllers;

import com.example.demo.dto.PointRequestDTO;
import com.example.demo.dto.PointResponseDTO;
import com.example.demo.models.Point;
import com.example.demo.models.User;
import com.example.demo.services.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/points")
public class PointController {

    @Autowired
    private PointService pointService;

    @PostMapping("/save")
    public Point savePoint(@RequestBody Point point) {
        return pointService.savePoint(point);
    }

    @GetMapping("/")
    public List<PointResponseDTO> getAllPoints() {
        return pointService.getAllPoints();
    }

    @PostMapping("/check")
    public PointResponseDTO checkCoordinates(@RequestBody PointRequestDTO pointDTO) {
        return pointService.validatePoint(pointDTO);
    }

    @PostMapping("/clear")
    public void clearResults() {
        pointService.clearResults();
    }
}
