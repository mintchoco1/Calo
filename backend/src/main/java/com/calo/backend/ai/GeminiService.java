package com.calo.backend.ai;

import com.calo.backend.BackendApplication;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.calo.backend.ai.dto.FoodAnalysis;
import com.fasterxml.jackson.databind.ObjectMapper;

//실제로 제미나이를 호출하는 코드
@Service
public class GeminiService {

        private final BackendApplication backendApplication;
        /**
         * RestTemplate: http 요청 보낼 때 쓰는 도구
         * objectmapper: Json <-> java 객체 변환 도구
         */
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    //yaml에서 api 키랑 모델 이름 가져오기      
    @Value("${gemini.api-key}")
    private String apiKey;
    @Value("${gemini.model}")
    private String model;

    GeminiService(BackendApplication backendApplication) {
        this.backendApplication = backendApplication;
    }

        /**
         * 사진 데이터 받기->제미나이한테 보내기->결과 받아서 객체로 변환->리턴
         * 
         */
    public FoodAnalysis analyzeFood(byte[] imageBytes) throws Exception {
        // 1. Gemini API 주소 만들기
        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                + model + ":generateContent?key=" + apiKey;

        // 2. 이미지를 Base64로 인코딩 (이미지를 텍스트 형태로 변환)
        // 이미지는 원래 0과 1의 바이너리 파일인데 json에 담으려면 문자열로 바꿔야함
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        // 3. Gemini한테 줄 프롬프트(질문) 작성
        String prompt = """
                이 음식 사진을 분석해서 반드시 아래 JSON 형식으로만 답해줘. 다른 설명이나 텍스트 없이 JSON만 출력해.
                {
                  "food_name": "음식 이름(한국어)",
                  "calories": 칼로리(kcal, 숫자만),
                  "carbs_g": 탄수화물(g, 숫자만),
                  "protein_g": 단백질(g, 숫자만),
                  "fat_g": 지방(g, 숫자만),
                  "sugar_g": 당(g, 숫자만)
                }
                정확한 수치를 모르겠으면 합리적으로 추정해서 채워줘.
                """;

        // 4. 요청 body 만들기 (Gemini가 요구하는 형식)
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of(
                        "parts", List.of(
                                Map.of("text", prompt),
                                Map.of("inline_data", Map.of(
                                        "mime_type", "image/jpeg",
                                        "data", base64Image))))));

        // 5. HTTP 요청 보내기
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        // 6. 응답에서 텍스트 부분만 추출
        Map<String, Object> body = response.getBody();
        List<Map> candidates = (List<Map>) body.get("candidates");
        Map content = (Map) candidates.get(0).get("content");
        List<Map> parts = (List<Map>) content.get("parts");
        String text = (String) parts.get(0).get("text");

        // 7. JSON 부분만 깔끔하게 추출
        text = text.replaceAll("```json", "").replaceAll("```", "").trim();

        // 8. JSON 문자열을 FoodAnalysis 객체로 변환
        return objectMapper.readValue(text, FoodAnalysis.class);
    }
}