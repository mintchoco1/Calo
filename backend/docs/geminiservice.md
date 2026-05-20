* byte[] imageBytes = [255, 216, 255, 224, 0, 16, ...]
이게 이미지 파일의 실제 내용. 이미 0과 1로 이루어짐.
* String base64Image = Base64.getEncoder().encodeToString(imageBytes)
여기서 0과 1로 다시 바꾸는게 아님. Base64 인코딩은 숫자들을 JSON에 넣을 수 있는 글자들로 바꾸는 것
JSON은 텍스트 포맷이고 이미지는 바이트 배열임
JSON 안에는 이럼 임의의 숫자 바이트를 직접 못담음. 그래서 안전한 글자들로만 표현하도록 바꿈 
원본:    [255, 216, 255, 224, ...]   ← 숫자 배열
Base64:  "/9j/4AAQSkZJRgABAQ..."    ← 글자 문자열

사진 파일 (food.jpg)
        ↓ 컴퓨터 안에서는 항상
0과 1의 나열: 11111111 11011000 11111111 ...
        ↓ 우리가 읽기 편하게
바이트 배열: [255, 216, 255, 224, ...]
        ↓ file.getBytes()로 꺼냄
byte[] imageBytes = [255, 216, 255, 224, ...]
        ↓ GeminiService로 넘김 (그냥 숫자 배열 전달)
analyzeFood(byte[] imageBytes)
        ↓ Base64 인코딩 (JSON에 넣을 수 있게 글자로 변환)
String base64Image = "/9j/4AAQSkZJRgABAQ..."
        ↓ JSON 안에 넣어서
        ↓ HTTP로 Gemini한테 전송

String promt는 제미나이한테 보내는 질문 텍스트. 이건 JSON인 아님
근데 제미나이 API는 http로 통신하는데 http 요청을 보낼 때 몸통(body)을 JSON 형식으로 감싸서 보내야함

Map ... 에서 JSON 구조로 감싼다.

* FoodAnalysis analyzeFood 메서드
사진 데이터 받기->제미나이한테 보내기->결과 받아서 객체로 변환->리턴
입력은 이미지 바이트 배열(MultipartFile.getBytes()의 결과물)
출력은 FoodAnalysis 객체 (음식 이름, 칼로리, 탄수화물, 단백질, 지방, 당 정보 담긴 객체)
예외 처리: 제미나이 호출 중에 문제가 생길 수 있으니까 예외 던지도록 throws Exception 붙여줌

restbody는 실제로 이렇게 생김
{
  "contents": [
    {
      "parts": [
        {
          "text": "이 음식 사진을 분석해서 반드시 아래 JSON 형식으로만 답해줘..."
        },
        {
          "inline_data": {
            "mime_type": "image/jpeg",
            "data": "/9j/4AAQSkZJRgABAQ..."
          }
        }
      ]
    }
  ]
}

Map.of() 는 new HashMap<>() 하고 put() 여러번 하는게 귀찮아서 한줄로 바로 만드는 단축 문법
Map.of("키1", 값1, "키2", 값2)
그러면 여기서 Map을 사용한 이유는 위에 처럼 제미나이에게 보내야함.
Map.of("contents",  List.of(  Map.of("parts",  List.of(
  ↓                   ↓         ↓               ↓
{ "contents":       [         { "parts":       [

  Map.of("text", prompt),             {"text": "..."},
  ↓                                    ↓

  Map.of("inline_data", Map.of(...))  {"inline_data": {...}}
  ↓                                    ↓

]}}                                   ]}]}
