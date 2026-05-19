package com.calo.backend.meal.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.calo.backend.meal.entity.Meal;

public interface MealRepository extends JpaRepository<Meal, Long> {
    
    List<Meal> findByMealDate(LocalDate mealDate);
    
}
