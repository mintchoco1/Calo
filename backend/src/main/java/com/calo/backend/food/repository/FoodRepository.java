package com.calo.backend.food.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.calo.backend.food.entity.Food;

public interface FoodRepository  extends JpaRepository<Food, Long> {

    // 한국어 이름으로 조회 (김치찌개, 비빔밥 등)
    Optional<Food> findByNameKo(String nameKo);

    // 영어 이름으로 조회 (pizza, salad 등)
    Optional<Food> findByNameEn(String nameEn);

    /**
     * JpaRepository가 제공하는 기본 CRUD 메서드들:
     * foodRepository.save(food);        // 저장
     * foodRepository.findById(1L);      // id로 조회
     * foodRepository.findAll();         // 전체 조회
     * foodRepository.deleteById(1L);    // 삭제
     */
}
