navigation 구조

* 두 가지 navigation 방식을 섞음

1. bottom tabs (하단 탭)
이건 화면에 항상 보임
2. stack(화면 쌓기)
Home Screen
   ↓ (카메라 버튼 누름)
Camera Screen   ← 전체 화면, 탭바도 가려짐
   ↓ (촬영 완료)
Result Screen
   ↑ (뒤로 가기)
Home으로 돌아옴

이 두 개를 합치기 (nested)
RootNavigator (Stack)
│
├── MainTabs (탭바가 보이는 메인)
│   ├── Home Tab     → HomeScreen
│   ├── Calendar Tab → CalendarScreen
│   └── Stats Tab    → StatsScreen
│
├── CameraScreen   ← 탭바 가리고 전체 화면
└── ResultScreen   ← 탭바 가리고 전체 화면

이렇게 하는 이유는 탭 화면들 (home,calendar,stats) = 항상 탭바가 보임. 메인 네비게이션
카메라/결과 화면 = 일시적인 작업 흐름. 끝나면 탭 화면으로 돌아옴

* navigationcontainer
react navigation의 전역 본부 같은거
전체 navigation 시스템이 동작하려면
현재 어떤 화면이 떠 있는지 추적
안드로이드의 물리 뒤로가기 버튼이랑 연동
딥 링크 처리
화면 사이 전환 애니메이션 조율
---- 이런 것들을 처리하는 중앙 관리 시스템
---- 앱 전체에서 딱 한 번 사용함. 그래서 app.tsx에 둠

* useNavigation 이란?
Hook을 먼저 알아야함
훅은 리엑트의 특별한 기능들에 훅을 걸어서 함수 컴포넌트에서 사용할 수 있게 해줌
use~~ 로 시작하는 함수는 다 훅 (useState, useEffect, useNavigation 등)
컴포넌트 함수의 최상단에서만 호출해야 함
조건문 반복문 안에서 호출하면 안됨
useNavigation() 이 한줄은 호출하면 지금 이 화면이 속한 navigator(stack, tab 등)를 찾아
그 navigator의 리모컨을 만들어서 돌려줌
우리는 그걸 navigation 이라는 변수에 넣음

navigation.navigate('이름')그 이름의 화면으로 이동
navigation.goBack()이전 화면으로 돌아가기
navigation.push('이름')Stack에 새 화면 쌓기 (같은 화면도 여러 번 쌓을 수 있음)
navigation.pop()Stack에서 하나 빼기 (뒤로가기랑 비슷)
navigation.reset(...)전체 navigation 상태 초기화
navigation.setOptions(...)헤더 제목 등 옵션 변경

useNavigation 같은 게 없으면, navigation 정보를 매번 props로 부모에서 자식에게 전달해야함
간단하게 useNavigation을 호출하면 객체 하나를 돌려줌. 여러개의 함수를 가짐
이 객체를 navigation이라는 이름으로 받음
