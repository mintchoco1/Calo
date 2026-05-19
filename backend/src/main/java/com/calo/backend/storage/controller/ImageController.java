package com.calo.backend.storage.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.calo.backend.ai.GeminiService;
import com.calo.backend.storage.R2StorageService;
import com.calo.backend.ai.dto.FoodAnalysis;

import lombok.RequiredArgsConstructor;

//http 요청을 받는 컨트롤러
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    //R2StorageService를 가져와서 쓰겠다고 선언
    //스프링이 알아서 R2StorageService의 인스턴스를 만들어서 주입해줌(의존성 주입)
    private final R2StorageService r2StorageService;
    private final GeminiService geminiService;

    /** 
     * post 방식으로 /api/images/upload 주소로 요청받음
     * http 요청에서 file이라는 이름의 파라미터를 받아옴
     * 
     */
 @PostMapping("/upload")
    public Map<String, Object> upload(@RequestParam("file") MultipartFile file) throws Exception {
        // 1. R2에 이미지 업로드
        String imageUrl = r2StorageService.upload(file);

        // 2. Gemini로 음식 분석
        FoodAnalysis analysis = geminiService.analyzeFood(file.getBytes());

        // 3. 결과 반환
        return Map.of(
                "imageUrl", imageUrl,
                "analysis", analysis
        );
    }
}