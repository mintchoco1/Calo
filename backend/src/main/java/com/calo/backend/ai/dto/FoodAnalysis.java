package com.calo.backend.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodAnalysis {

    //gemini가 보내준 결과를 담을 그릇

    @JsonProperty("food_name")
    private String foodName;

    private Integer calories;

    @JsonProperty("carbs_g")
    private Double carbs;

    @JsonProperty("protein_g")
    private Double protein;

    @JsonProperty("fat_g")
    private Double fat;

    @JsonProperty("sugar_g")
    private Double sugar;

    @Override
    public String toString() {
        return "FoodAnalysis{" +
                "foodName='" + foodName + '\'' +
                ", calories=" + calories +
                ", carbs=" + carbs +
                ", protein=" + protein +
                ", fat=" + fat +
                ", sugar=" + sugar +
                '}';
    }
}