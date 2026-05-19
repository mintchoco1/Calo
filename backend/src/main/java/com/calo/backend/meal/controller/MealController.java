package com.calo.backend.meal.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

//스프링 관련
import org.springframework.web.bind.annotation.*;

import com.calo.backend.meal.entity.Meal;
import com.calo.backend.meal.repository.MealRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/meals")
@RequiredArgsConstructor
public class MealController {
    private final MealRepository mealRepository;

    @PostMapping
    public Meal create(@RequestBody Meal meal) {
        meal.setCreatedAt(LocalDateTime.now());
        return mealRepository.save(meal);
    }

    @GetMapping
    public List<Meal> getByDate(@RequestParam LocalDate date) {
        return mealRepository.findByMealDate(date);
    }
}
