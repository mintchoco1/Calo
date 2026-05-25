More Actions를 눌러주면 해당 버튼들이 보이는데 SDK Manager로 들어가줍니다.
그럼 SDK들을 볼 수 있는데 여기서 SDK Tools로 들어가주고 다음에 보이는 것들을 설치해줍니다.
Android SDK Build-Tools 35 -rc2
Android SDK Command-line Tools (latest)
Android Emulator
Android SDK Plaform-Tools

시스템 환경변수에서 설정해줘야함
ANDROID_HOME
C:\Users\ldj23\AppData\Local\Android\Sdk 이거는 sdk 걸치 위치

위에 있는 사용자에 대한 사용자 변수에서 PATH에서 새로 만들어주기
C:\Users\사용자\AppData\Local\Android\Sdk\tools
C:\Users\사용자\AppData\Local\Android\Sdk\platform-tools
C:\Users\사용자\AppData\Local\Android\Sdk\emulator
C:\Users\사용자\AppData\Local\Android\Sdk\build-tools
adb --version 로 체크까지

리액트 네이티브는 모든 글자를 무조건 <Text> 안에 넣어야함

npx @react-native-community/cli@latest init frontend

* Deprecated Gradle features were used in this build, making it incompatible with Gradle 10.
이거는 Gradle 9.3.1 에서 deprecated된 기능을 사용 중이라는 뜻인데 리엑트 네이티브 0.85.3이 아직 Gradle 9.x 최신 버전과 호환되지 않는다는 뜻
해결법으로 gradle 버전 낮추기
gradle-wrapper.properties 에서 수정
distributionUrl=https\://services.gradle.org/distributions/gradle-8.10.2-all.zip
바꾸고 ./gradlew clean 
gradlew은 gradle wrapper의 줄임말. gradle을 시스템에 전역 설치 없이 프로젝트 안에 내장된 Gradle로 실행하는 스크립트

* npm start 
Metro 번들러 서버 켜기
app.tsx 같은 자바스크립트 코드를 실시간으로 묶어줌(번들링)
코드 수정하면 자동으로 감지해서 에뮬레이터에 새 코드 전달
포트 8081에서 동작

* npx react-native run-android 
안드로이드 앱 빌드 + 에뮬레이터에 설치 + 실행
하는 일
Gradle이 안드로이드 코드 컴파일
APK 파일 생성(앱 설치 파일)
에뮬레이터에 apk 설치
앱 실행
메트로 서버에 연결
js 코드 받아와 화면에 표시
┌──────────────────────────────────────────────┐
│ 내 컴퓨터                                       │
│                                               │
│  ┌─────────────────┐                          │
│  │ Metro 서버      │  ← 왼쪽 터미널 (npm start) │
│  │ (포트 8081)      │                          │
│  │                 │                          │
│  │ App.tsx 코드    │                          │
│  │ ↓ 실시간 번들링  │                          │
│  └────────┬────────┘                          │
│           │                                   │
│           │ JS 코드 전달                       │
│           ↓                                   │
│  ┌─────────────────┐                          │
│  │ 에뮬레이터        │  ← 앱이 여기서 실행됨        │
│  │ (emulator-5554) │                          │
│  │                 │                          │
│  │ [내 앱 화면]      │                          │
│  └─────────────────┘                          │
│                                               │
│  오른쪽 터미널은 빌드 끝나고 대기 상태              │
└──────────────────────────────────────────────┘

# 1. Android Studio → 에뮬레이터 켜기

# 2. 터미널 1 — Metro 서버
cd ~/Desktop/project/Calo/frontend
npm start

# 3. 터미널 2 — 앱 설치 (이미 설치되어 있으면 생략 가능)
cd ~/Desktop/project/Calo/frontend
npx react-native run-android