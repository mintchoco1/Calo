전체 흐름
1. 사용자가 폰에서 사진 찍음
    사진 파일 전송
2. 스프링 부트 서버에서 ImgageController
    R2에 사진 업로드
3. Cloudflare R2
    사진 URL 받음
    r2가 저장 완료하고 주소는 이거야 라고 응답.
    서버가 그 주소를 받음 예https://pub-abc.r2.dev/meals/uuid-kimchi.jpg
4. 스프링부트 서버 - GeminiService
    제미나이한테 분석 요청
5. google gemini
    분석 결과 받음: 음식 이름, 칼로리, 영양소
6. 스프링부트 서버
    모든 정보를 Meal 객체로 만듦
    흩어진 정보들을 Meal 객체로 모음
    결과는 Meal 객체 URL + 분석결과 + 날짜 다 합쳐짐
7. MealRepository.save(meal)
    이게 Db에 Insert 명령 보냄
8. Mysql -meals 테이블에 한줄 추가됨
9. 사용자한테 응답