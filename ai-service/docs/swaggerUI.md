테스트는 swaggerUI에서: 브라우저로 http://localhost:8000/docs 열고
1. POST /classify 항목 클릭
2. try it out 클릭
3. image 필드: Choose File 버틍으로 test_image.jpg
4. labels 필드에 JSON 문자열 입력
["김치찌개", "비빔밥", "명란파스타", "라멘", "제육볶음"]

응답 영역에 결과가 떠야 함 JSON 형태로 떠야함
뜨면 Python 추론 서비스가 HTTP로 동작하는 상태

-------------------------------
그러면 Swagger UI는 무엇인가
서버에 어떤 API들이 있는지 자동으로 보여주고, 브라우저에서 직접 호출해볼 수 있는 페이지. 일종의 API 놀이터
우리가 만든 FastAPI로 만든 모든 엔드포인트(GET /, POST/classify)가 자동으로 목록에 뜸
각 엔드포인트의 입력 형식을 폼으로 보여줌
폼 채우고 Execute 누르면 진짜로 서버에 요청을 보냄
응답이 초록색 박스에 표시됨
-------------------------------
이게 FastAPI의 기본 내장 기능. 코드 한 줄도 안쓰고 자동으로 만들어 진것
Spring Boot에서도 springdoc-openai 같은 라이브러리 추가하면 똑같은 게 생김

명령줄(curl)로도 테스트 가능
git bash 에서 입력 -> 위에랑 같은 응답이 와야함
curl -X POST http://localhost:8000/classify \
  -F "image=@test_image.jpg" \
  -F 'labels=["김치찌개","비빔밥","명란파스타","라멘"]'

* curl 이란?
명령줄에서 HTTP 요청을 보내는 도구. 이름은 Client URL의 줄임말
브라우저는 GUI로 HTTP 요청을 보내는 도구. URL 치고 엔터를 누르면 GET 요청을 보내고, 
폼 제출하면 POST 요청 보내고 보이는 결과는 렌더링된 페이지
curl은 같은 일을 텍스트 명령어로 함. 결과도 보통 원본 텍스트(HTML,JSON 등)로 그냥 출력
API 테스트, 자동화 스크립트, CI/CD 디버깅 같은 데서 거의 필수
java의 세계에서 postman 같은 도구

curl -X 'POST' \
  'http://localhost:8000/classify' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@test_image3.jpg;type=image/jpeg' \
  -F 'labels=김치찌개,비빔밥,명란파스타,라멘,제육볶음'

curl: 명령어 본체
-X 'POST': HTTP 메소드 지정. GET, POST, PUT, DELTE 등 생략하면 기본 GET
'http://localhost:8000/classify': 요청 보낼 URL
-H '...': HTTP 헤더 추가. -H 한 번에 한 줄. 여러 헤더면 여러 번
-F '...': 폼 필드 추가 (multipart/form-data 형식). image=@파일경로 처럼 @붙이면 그 파일을 첨부해서 보냄
\ (줄 끝): 다음 줄로 명령어 이어진다는 표시. 한 줄로 길게 써도 동일

실제로 어떻게 테스트하나
curl -X POST http://localhost:8000/classify \
  -F "image=@test_image3.jpg" \
  -F 'labels=["김치찌개","비빔밥","명란파스타","라멘","제육볶음"]'

@기호로 이건 파일이라고 표시
labels=[...] JSON 배열 형식으로
{"results":[{"score":0.85,"label":"김치찌개"},{"score":0.11,"label":"제육볶음"},...]} 이런식으로 나옴 
