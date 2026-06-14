의존성 vs 라이브러리
모든 라이브러리는 의존성이지만 모든 의존성이 라이브러리는 아님

라이브러리 설치하면 npx react-native run-android 해줌

navigation
화면 전환과 탭 구조를 관리하기 위해 React Navigation 생태계의 라이브러리들을 사용

@react-navigation/native
핵심 엔진 역할
현재 어떤 화면이 떠 있는지, 이전 화면이 뭐였는지, 뒤로 가기를 누르면 어디로 가야하는지 같은
navigation 상태를 전부 관리
다른 navigation 패키지들은 모두 이걸 기반으로 작동하기 때문에 가장 먼저 설치해야함

react-native-screens
화면 전환 성능 최적화
React Navtive는 기본적으로 화면 전환을 JavaScript로 처리
이 라이브러리를 깔면 네이티브 단에서 직접 화면 전환을 처리해 훨씬 부드럽고 빨라짐
예를 들어 홈->카메라 화면으로 넘어갈 때 끊김없는 자연스러운 애니메이션

react-native-safe-area-context
안전 영역(safe area) 계산
요즘 스마트폰은 위쪽에 노치/펀치홀, 아래똑에 이상한게 있음
화면 전체에 UI를 그리면 이런 부분과 겹쳐서 가려진다
이 라이브러리는 이 부분은 가려지니 피해서 그려라 라고 알려주는 역할
텍스트나 버튼이 노치에 가려지지 않게 해준다

@react-navigation/native-stack
화면을 쌓는 방식의 navigator
카드 덱처럼 새 화면이 위에 올라가고, 뒤로 가면 위 카드가 사라지는 구조
android.ios의 네이티브 화면 전환 시스템을 그대로 사용해서 성능이 좋고
os표준 애니메이션을 따른다

@react-navigation/bottom-tabs
하단 탭바 navigator
앱 아래쪽에 고정된 탭들이 있고, 누르면 화면이 바뀌는 패턴
각 탭은 서로 독립적이라 다른 탭 갔다 돌아와도 이전 상태가 유지됨