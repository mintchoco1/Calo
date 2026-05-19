package com.calo.backend.meal.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//식사 기록 저장/조회
@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@Table(name="meals")
public class Meal {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private LocalDate mealDate;        // 식사 날짜

    @Column(nullable=false, length=100)
    private String foodName;           // 음식 이름

    @Column(nullable=false)
    private Integer calories;          // 칼로리(kcal)

    private Double carbs;              // 탄수화물(g)
    private Double protein;            // 단백질(g)
    private Double fat;                // 지방(g)
    private Double sugar;              // 당(g)

    private String imageUrl;           // R2에 저장된 이미지 URL

    //만들어진 후로는 절대 변경 안됨
    @Column(nullable=false, updatable=false)
    private LocalDateTime createdAt;   //생성 시간(필수, 수정 불가)
}
