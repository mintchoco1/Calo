백엔드처럼 떠 있는 Python 서버. Post 요청으로 이미지와 라벨 리스트를 받으면 JSON으로 분류 결과를 돌려주는 것

[클라이언트(curl, 브라우저, 또는 나중에 Spring Boot)]
        ↓ POST /classify
        ↓ 이미지 파일 + 라벨 리스트
        
[FastAPI 서버 (이거 만듦)]
        ↓ classify.py의 추론 로직 사용
        
        ↓ JSON 응답
[클라이언트]
{
  "results": [
    {"label": "명란파스타", "score": 0.3707},
    {"label": "라멘", "score": 0.0043},
    ...
  ]
}

__init__.py 는 빈 파일. 이 파일이 있어야 Python이 그 폴더를 패키지(import 가능한 모듈 집합)로 인식
java으이 package 선언과 비슷한 역할

FastAPI 설치
가상환경 활성화 한 상태에서
source .venv/Scripts/activate
pip install fastapi "uvicorn[standard]" python-multipart

fastapi: 우리가 쓸 웹 프레임워크. Spring Boot의 Python 카운터파트라고 생각하면 됨. 비동기 기본 지원
uvicorn[standard]: FastAPI를 실제로 실행하는 AGSI 서버. Tomcat 같은 역할. standard 옵션은 자동 재시작. WebSocket 지원 같은 부가 기능 포함
python-multipart: 이미지 같은 파일 업로드 (multipart/form-data)를 받기 위한 라이브러리

설치했으면 pip freeze > requirements.txt으로 업데이트

서버 실행
uvicorn app.main:app --reload --port 8000
uvicorn: 서버 실행기
app.main:app: "app/main.py 안의 app 이라는 변수를 띄우라는 뜻. 콜론 앞이 모듈 경로 뒤가 변수명
--reload: 코드가 바뀌면 자동 재시작 (개발용.프로덕션에선 끔)
--port 8000: 8000번 포트. Spring Boot가 보통 8080을 쓰니까 충돌 피해서 8000으로

브라우저에서 http://localhost:8000/ 열면 {"status":"ok","service":"calo-ai"} 보이면 성공
보너스: http://localhost:8000/docs 열어보세요. FastAPI가 자동으로 Swagger UI를 만들어줘요. 이게 진짜 편한 기능이에요. 곧 만들 /classify도 여기서 바로 테스트 가능.

_classifier를 모듈 전역 변수로 두고 load_model()로 채움. 함수 안에서 매번 모델을 로딩하면 안됨(매 요청마다 30초+ 걸림)
변수 이름 앞의 _ 는 이건 모듈 내부용이야, 외부에서 직접 import해서 쓰지 마세요 라는 Python 관습
claddify_image는 모델이 로드 안된 상태로 호출되면 에러 발생. 방어 코드

main.py에 startup 이벤트와 classify 엔드포인트 추가
lifespan: FastAPI의 서버 시작/종료 이벤트 훅. @asynccontextmanager로 감싸서 yield 앞은 시작 시, 
뒤는 종료 시 실행. 여기서 load_model() 을 호출해서 모델을 서버 부팅 시 한 번만 로딩
UploadFile = File(...): multipart 파일 업로드 받기. File(...) 의 ... 은 필수 파라미터라는 표시
labels: str = Form(...): 폼 데이터로 문자열 받기. JSON 문자열 형태로 보내고 서버에서 파싱
io.BytesIO: 바이트를 파일처럼 다루기 위한 래퍼. PIL이 파일 경로나 파일 객체 둘 다 받는데 바이트만 있을 땐
BytesIO로 감싸야 함