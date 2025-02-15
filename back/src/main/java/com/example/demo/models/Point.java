package com.example.demo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Setter
@Getter
@Table(name = "points")
public class Point {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private Double x;
    private Double y;
    private Double r;

    @Column(name = "is_valid")
    private Boolean isValid;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "execution_time")
    private LocalDateTime executionTime;

}
