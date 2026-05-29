package com.calo.backend.food.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nameKo;

    @Column(length = 200)
    private String nameEn;

    // 전부 100g 기준
    @Column(nullable = false)
    private Double calories;

    private Double carbs;
    private Double protein;
    private Double fat;
    private Double sugar;

    @Column(length = 50)
    private String source;        // MFDS(식약처) or USDA

    // JPA용 기본 생성자
    protected Food() {}

    // 실제 생성은 이 생성자로만
    public Food(String nameKo, String nameEn, Double calories,
                Double carbs, Double protein, Double fat,
                Double sugar, String source) {
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.calories = calories;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.sugar = sugar;
        this.source = source;
    }

    public Long getId() { return id; }
    public String getNameKo() { return nameKo; }
    public String getNameEn() { return nameEn; }
    public Double getCalories() { return calories; }
    public Double getCarbs() { return carbs; }
    public Double getProtein() { return protein; }
    public Double getFat() { return fat; }
    public Double getSugar() { return sugar; }
    public String getSource() { return source; }
}
