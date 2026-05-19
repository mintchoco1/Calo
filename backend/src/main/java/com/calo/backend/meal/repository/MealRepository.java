package com.calo.backend.meal.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.calo.backend.meal.entity.Meal;

public interface MealRepository extends JpaRepository<Meal, Long> {
    
    List<Meal> findByMealDate(LocalDate mealDate);
    
    /**
     * 메서드 본문이 없음
     * JpaRepository을 상속받은 것만으로 다음 메서드들이 자동으로 생김
     * save(meal)
     * findById(1L)
     * findAll()
     * deleteById(1L)
     * count()
     */
}
