package com.calo.backend.storage;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

//서비스 클래스
//R2StorageService 클래스는 Cloudflare R2 스토리지와 통신하여 파일을 업로드하는 역할을 합니다.
@Service
@RequiredArgsConstructor
public class R2StorageService {

    //spring이 자동으로 r2config에서 만든 s3client를 여기에 꽂아줌. 의존성 주입
    private final S3Client s3Client;

    //yaml에서 bucket 이름과 public url 가져옴
    @Value("${cloudflare.r2.bucket}")
    private String bucket;

    @Value("${cloudflare.r2.public-url}")
    private String publicUrl;

    // 파일 업로드 메서드
    // 사진 파일 하나 받아서 r2에 올리고 그 사진의 url을 반환
    // mulitpartfile file은 사용자가 업로드한 사진 파일
    // string은 리턴타입(url 문자열)
    public String upload(MultipartFile file) throws IOException {
        // 1. 파일에 고유한 이름 붙이기
        // 같은 파일명이 두 번 올라오면 덮어쓰기됨
        // 예를 들어 사용자 a가 food.jpg를 올리고 다음 사용자 b가 food.jpg를 올리면 a의 사진이 b의 사진으로 덮어쓰기됨
        // 그래서 UUID(고유한 랜덤 ID)를 붙여서 파일 이름이 겹치지 않도록 함
        String originalName = file.getOriginalFilename();
        String key = "meals/" + UUID.randomUUID() + "-" + originalName;

        // 2. R2에 업로드
        // 버킷에 저장할 내용
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)                           //어느 버킷에?
                        .key(key)                                 //어떤 이름으로?
                        .contentType(file.getContentType())       //어떤 종류 파일?
                        .build(),
                RequestBody.fromBytes(file.getBytes())            //실제 파일 내용
        );

        // 3. 업로드된 사진의 URL 반환
        return publicUrl + "/" + key;
    }
}