package com.example.demo.services;

import com.example.demo.models.Point;
import com.example.demo.repositories.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    public Point savePoint(Point point) {
        return pointRepository.save(point);
    }

    public List<Point> getPointsByUserId(Long userId) {
        return pointRepository.findByUserId(userId);
    }

    public List<Point> getAllPoints() {
        return pointRepository.findAll();
    }

    public boolean checkCoordinates(Point point) {
        // Placeholder implementation: All points pass the check
        point.setIsValid(true);
        savePoint(point);
        return true;
    }

    public void clearResults() {
        pointRepository.deleteAll();
    }

}
