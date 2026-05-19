package com.calo.backend.meal.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.calo.backend.ai.dto.FoodAnalysis;
import com.calo.backend.meal.entity.Meal;
import com.calo.backend.meal.repository.MealRepository;

import lombok.RequiredArgsConstructor;

/**
 * 식사 기록 관련 비즈니스 로직을 담당하는 서비스
 * - 분석 결과와 이미지 URL을 받아 Meal 객체로 만들고 DB에 저장
 */
@Service
@RequiredArgsConstructor
public class MealService {

    // DB 접근용 Repository (스프링이 자동 주입)
    private final MealRepository mealRepository;

    /**
     * Gemini 분석 결과와 이미지 URL을 받아서 식사 기록을 DB에 저장한다.
     *
     * @param analysis Gemini가 분석한 음식 정보
     * @param imageUrl R2에 저장된 이미지 URL
     * @return DB에 저장된 Meal 객체 (id 포함)
     */
    public Meal createMealFromAnalysis(FoodAnalysis analysis, String imageUrl) {
        // 흩어진 정보들을 Meal 객체 하나로 모으기
        Meal meal = Meal.builder()
                .mealDate(LocalDate.now())
                .foodName(analysis.getFoodName())
                .calories(analysis.getCalories())
                .carbs(analysis.getCarbs())
                .protein(analysis.getProtein())
                .fat(analysis.getFat())
                .sugar(analysis.getSugar())
                .imageUrl(imageUrl)
                .createdAt(LocalDateTime.now())
                .build();

        // DB에 저장하고 저장된 결과(id 포함된 Meal) 리턴
        return mealRepository.save(meal);
    }
}