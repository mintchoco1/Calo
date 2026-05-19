package com.calo.backend.meal.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Meal {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate mealDate;        // 식사 날짜
    private String foodName;           // 음식 이름
    private Integer calories;          // 칼로리(kcal)
    private Double carbs;              // 탄수화물(g)
    private Double protein;            // 단백질(g)
    private Double fat;                // 지방(g)
    private Double sugar;              // 당(g)
    private String imageUrl;           // R2에 저장된 이미지 URL

    private LocalDateTime createdAt;
}
