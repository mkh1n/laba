package com.example.demo.services;

import com.example.demo.dto.PointRequestDTO;
import com.example.demo.dto.PointResponseDTO;
import com.example.demo.models.Point;
import com.example.demo.models.User;
import com.example.demo.repositories.PointRepository;
import com.example.demo.utils.Validator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repositories.UserRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    public Point savePoint(Point point) {
        User user = userRepository.findById(point.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        point.setUser(user); // Устанавливаем пользователя
        return pointRepository.save(point);
    }

    public List<PointResponseDTO> getAllPoints() {
        List<Point> points = pointRepository.findAll();
        return points.stream()
                .map(point -> {
                    PointResponseDTO dto = new PointResponseDTO();
                    dto.setX(point.getX());
                    dto.setY(point.getY());
                    dto.setR(point.getR());
                    dto.setUsername(point.getUser().getUsername());
                    dto.setIsValid(point.getIsValid());
                    return dto;
                })
                .collect(Collectors.toList());
    }
    public PointResponseDTO validatePoint(PointRequestDTO pointDTO) {
        User user = userRepository.findById(pointDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Point point = new Point();

        point.setX(pointDTO.getX());
        point.setY(pointDTO.getY());
        point.setR(pointDTO.getR());
        point.setUser(user);

        boolean isValid = validator.isInArea(point);
        point.setIsValid(isValid);

        user.addPoint(point);
        pointRepository.save(point); // Сохраняем точку в базе данных

        // Возвращаем DTO с нужными данными
        PointResponseDTO responseDTO = new PointResponseDTO();
        responseDTO.setX(point.getX());
        responseDTO.setY(point.getY());
        responseDTO.setR(point.getR());
        responseDTO.setUsername(user.getUsername());
        responseDTO.setIsValid(isValid);
        return responseDTO;
    }
    public void clearResults() {
        pointRepository.deleteAll();
    }

}
