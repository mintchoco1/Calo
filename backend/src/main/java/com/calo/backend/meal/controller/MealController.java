package com.calo.backend.meal.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
