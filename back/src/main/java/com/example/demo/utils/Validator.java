package com.example.demo.utils;

import com.example.demo.dto.PointRequestDTO;
import com.example.demo.models.Point;
import org.springframework.stereotype.Service;

@Service
public class Validator {

    public boolean isInArea(Point point) {
        return (checkIsTriangle(point) || checkIsCircle(point) || checkIsRectangle(point));
    }
    private boolean checkIsTriangle(Point point) {
        return !(point.getY() > point.getR() / 2  - point.getX() / 2 ||
                point.getX() < 0 || point.getY() < 0);
    }


    private boolean checkIsCircle(Point point) {
        // Quarter circle in the second quadrant
        return (point.getX()  <= 0 &&
                point.getY()  >= 0 &&
                Math.hypot(point.getX(), point.getY()) <= point.getR());
    }
    private boolean checkIsRectangle(Point point) {
        return (point.getX() <= 0 &&
                point.getY() <= 0 &&
                point.getX() >= -point.getR() / 2 &&
                point.getY() >= -point.getR());
    }
}
