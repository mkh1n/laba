package com.example.demo.services;

import com.example.demo.dto.PointRequestDTO;
import com.example.demo.models.Point;
import com.example.demo.models.User;
import com.example.demo.repositories.PointRepository;
import com.example.demo.utils.Validator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repositories.UserRepository;
import java.util.List;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    public Point savePoint(Point point) {
        return pointRepository.save(point);
    }

    public List<Point> getPointsByUserId(Long userId) {
        return pointRepository.findByUserId(userId);
    }

    public List<Point> getAllPoints() {
        return pointRepository.findAll();
    }

    public boolean validatePoint(PointRequestDTO pointDTO) {
        var user = userRepository.findById(pointDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        var point = new Point();

        point.setX(pointDTO.getX());
        point.setY(pointDTO.getY());
        point.setR(pointDTO.getR());
        point.setUser(user);

        var isValid = validator.isInArea(point);

        point.setIsValid(isValid);

        user.addPoint(point);
        pointRepository.save(point);

        return isValid;
    }

    public void clearResults() {
        pointRepository.deleteAll();
    }

}
