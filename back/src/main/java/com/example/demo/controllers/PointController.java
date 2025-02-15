package com.example.demo.controllers;

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

    @GetMapping("/user/{userId}")
    public List<Point> getPointsByUser(@PathVariable Long userId) {
        return pointService.getPointsByUserId(userId);
    }

    @GetMapping("/")
    public List<Point> getAllPoints() {
        return pointService.getAllPoints();
    }

    @PostMapping("/check")
    public boolean checkCoordinates(@RequestBody Point point) {
        return pointService.checkCoordinates(point);
    }

    @PostMapping("/clear")
    public void clearResults() {
        pointService.clearResults();
    }
}
