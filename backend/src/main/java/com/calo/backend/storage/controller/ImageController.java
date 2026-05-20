package com.calo.backend.storage.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.calo.backend.ai.GeminiService;
import com.calo.backend.ai.dto.FoodAnalysis;
import com.calo.backend.meal.entity.Meal;
import com.calo.backend.meal.service.MealService;
import com.calo.backend.storage.R2StorageService;

import lombok.RequiredArgsConstructor;

    /**
     *  http 요청을 받는 입구(controller)역할. 클라이언트가 음식 사진은 업로드하면 이 컨트롤러가 받아서 두 가지 일을 위임함
     *  R2스토리지에 이미지 저장 -> R2StorageService의 upload 메서드 호출 -> R2에 이미지 저장하고 URL 받아옴
     *  제미나이로 음식 분석 ->  GeminiService의 analyzeFood 메서드 호출 -> 제미나이한테 이미지 보내고 분석 결과 받아옴
     *  그리고 결과를 JSON으로 클라이언트에게 돌려줌
     *  컨트롤러는 받고 시키고 응답만 하고 실제 일은 서비스 계층이함. 
     */

@RestController//Controller와 ResponseBody 합친 어노테이션. 이 컨트롤러는 JSON으로 응답할 거라고 알려줌. Meal 객체를 자동으로 JSON으로 변환해서 응답해줌
@RequestMapping("/api/images")
@RequiredArgsConstructor//fianl 필드들을 인자로 받는 생성자를  컴파일 시점에 자동 생성해줌
public class ImageController {

    private final R2StorageService r2StorageService;
    private final GeminiService geminiService;
    private final MealService mealService;

    @PostMapping("/upload")
    public Meal upload(@RequestParam("file") MultipartFile file) throws Exception {
        // 1. R2에 이미지 업로드
        String imageUrl = r2StorageService.upload(file);

        // 2. Gemini로 음식 분석
        FoodAnalysis analysis = geminiService.analyzeFood(file.getBytes());

        // 3. 식사 기록 생성 및 DB 저장 (MealService에 위임)
        //MealService한테 이 분석 결과랑 이미지 url로 Meal 기록 만들어서 DB에 저장하고 돌려줘라고 시킴
        return mealService.createMealFromAnalysis(analysis, imageUrl);
    }
}