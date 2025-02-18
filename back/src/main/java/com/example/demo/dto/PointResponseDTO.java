package com.example.demo.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor()
public class PointResponseDTO {
    @NonNull
    private Double x;
    @NonNull
    private Double y;
    private Double r;
    private String username;
    private Boolean isValid;


}