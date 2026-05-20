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

ImgageController 흐름
1. 사용자가 사진 업로드
2. ImageContoller 에서
    R2업로드
    제미나이 분석
    MealService 호출
        MealSerivce 에서
            Meal 객체 만들기
            DB 저장
        MealRepository 에서
            DB INSERT
        저장된 Meal 객체 리턴

http 요청이란?
앱에서 사진 업로드 버튼을 누르면 앱이 서버한테 편지를 보냄. 이 편지가 http 요청
편지는 정해진 양식이 있음
어디로 보낼지:  POST /api/images/upload
편지지 종류:    Content-Type: multipart/form-data
--------------------------------------------
편지 내용:      (여기에 파일 데이터가 들어감)
근데 파일 업로드는 특별함. 파일 업로드는 일반 텍스트 전송이 아님. 이미지 바이너리 데이터를 보내야함.
그래서 특별한 양식을 사용함. multipart/form-data
이 형식은 편지 안에 여러 개의 조각(part)을 담을 수 잇음. 각 조각에는 이름표가 붙어 있음
POST /api/images/upload
Content-Type: multipart/form-data; boundary=---경계선

-----경계선
Content-Disposition: form-data; name="file"; filename="food.jpg"
Content-Type: image/jpeg

(여기에 이미지 바이너리 데이터 쭉...)
-----경계선--