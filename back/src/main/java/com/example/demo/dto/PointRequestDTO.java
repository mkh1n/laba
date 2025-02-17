package com.example.demo.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor()
public class PointRequestDTO {
    @NonNull
    private Double x;
    @NonNull
    private Double y;
    private Double r;
    private String username;
    private Long userId;

}