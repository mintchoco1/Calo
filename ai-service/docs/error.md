Swagger UI가 보여준 것

Code: 500
Error: Internal Server Error
Response body: Internal Server Error

이거는 클라이언트(브라우저) 입장에서 본 것
클라이언트는 서버가 무너가 잘못됐다 정도만 알고 구체적으로 뭐가 잘못됐는지는 모름
500은 서버 내부에서 뭔가 폭발했음 이라는 일반적인 신호

진짜 에러 - 서버 터미널에 있음
내 화면에 uvicorn 이 돌고 있는 터미널 창이 따로 열려 있을 거임. 그 창에 진짜 에러 메시지가 출력됨

------------------------------------------------------------------------------------
INFO:     127.0.0.1:XXXX - "POST /classify HTTP/1.1" 500 Internal Server Error
ERROR:    Exception in ASGI application
Traceback (most recent call last):
  File ".../app/main.py", line 30, in classify
    candidate_labels = json.loads(labels)
  File ".../json/__init__.py", line 346, in loads
    return _default_decoder.decode(s)
  File ".../json/decoder.py", line 337, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
  File ".../json/decoder.py", line 355, in raw_decode
    raise JSONDecodeError("Expecting value", s, err.value) from None
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
------------------------------------------------------------------------------------
에러 보는 방법
핵심 두 줄만 보면 됨
맨 아래 줄-에러의 종류와 정확한 메시지
예시에서는 JSON 해석하다가 실패함. 첫 번째 글자부터 이상하다는 뜻
Traceback은 호출 스택. 함수가 함수를 부르고, 또 함수를 부르고 .. 그 체인 전체를 보여줌
그 중에서 File ".../app/main.py" 또는 .../inference.py 처럼 우리 코드 파일이 나오는 줄을 찾아야함
그게 우리 코드 어디서 에러가 시작됐는지 알려줌

File ".../app/main.py", line 30, in classify
    candidate_labels = json.loads(labels)

main.py 30번째 줄, classify 함수 안의 json.loads(labels) 호출에서 시작됐다는 뜻

--------------------------------------------------------------------------------------
나한테 생긴 오류. 여기가 시작 부분. 아래로 내리면서 내 코드를 찾아야함
Traceback (most recent call last):
  File "C:\Users\ldj23\Desktop\project\Calo\ai-service\.venv\Lib\site-packages\uvicorn\protocols\http\httptools_impl.py", line 421, in run_asgi
    result = await app(  # type: ignore[func-returns-value]
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        self.scope, self.receive, self.send
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
.
.
File "C:\Users\ldj23\Desktop\project\Calo\ai-service\app\main.py", line 36, in classify
    candidate_labels = json.loads(labels)
                       ^^^^^^^^^^^^^^^^^^
        
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
--------------------------------------------------------------------------------------
JSONDecodeError: JSON을 해석하려다가 실패함
Expecting value: 값을 기대했는데 없었다. JSON 안에 뭔가가 있어야 할 위치에 아무것도 없거나 이상한게 있음
line 1 column 1 (char 0): 그 문제가 맨 처음 글자에서 발생함
main.py 36번째 줄, classify 함수 안, json.loads(labels)를 호출한 그 순간 에러가 발생. 친절하게 그 줄 코드까지 보여주고 ^^^ 표시로 정확한 위치 표시해줘요.
main.py 36줄에서 json.loads(labels)를 호출했는데, labels 변수에 담긴 문자열의 첫 글자부터 JSON이 아니어서 파싱 실패함
