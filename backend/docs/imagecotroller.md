POST /api/images/upload 요청을 메서드가 처리
@RequestParam("file")은 http 요청 안에서 이름표가 file인 조각을 찾아줘라고 시키는 어노테이션
예를 들어 formData.append("file", imageFile); 스프링이 이름표 보고 찾아옴. file이 아니아 image라고 써놨으면 이름표image인 조각을 찾아옴
MultipartFile은 스프링이 찾아온 조각을 어떤 타입으로 담을지 선언. 업로드된 파일을 다루기 편하게 포장해놨음
file.getOriginalFilename()  // "food.jpg"
file.getContentType()        // "image/jpeg"
file.getBytes()              // [255, 216, ...] 순수 바이트
file.getSize()               // 파일 크기(바이트)

FoodAnalysis analysis = geminiService.analyzeFood(file.getBytes());
getBytes를 호출하면 파일의 순수 바이트 배열을 꺼내줌.
자바 메모리 안에서 바이트 배열을 꺼낸다는거는 프로그램이 실행되면 램을 사용함
변수에 값을 담으면 그게 메모리에 올라감. 사용자가 사진을 업로드하면 jpg 파일을 http 업로드함
서버 메모리에 올라옴. MultopartFile file 변수에 들어잇음
멀티파트파일은 이미 서버 메모리 안에 사진 데이터를 들고 있음. 디스크에서 읽어오는게 아님. 이미 메모리에 존재.
근데 이거는 사진 데이터 외에도 여러 정보를 포장해서 가지고 있음.

MultipartFile file
┌─────────────────────────────┐
│ 파일이름: "food.jpg"         │
│ 파일타입: "image/jpeg"       │
│ 파일크기: 245678             │
│ 바이트데이터: [255,216,...]  │  ← 진짜 사진 내용
└─────────────────────────────┘

왜 file 통째로 안 보낼까? 이유는 제미나이 서비스는 이미지 픽셀 데이터만 있으면 분석할 수 있음.파일 이름이나 크기는 관심 x
분석 결과를 변수에 저장

