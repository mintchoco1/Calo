react-native-image-picker:
[사진 찍기] 버튼 → 시스템 카메라 앱 열림 → 찍으면 결과 반환
                  (iOS/Android 기본 카메라 UI 사용)

react-native-vision-camera:  (요즘 표준)
[사진 찍기] 버튼 → 우리 앱 안에서 직접 카메라 뷰파인더 + 셔터 버튼
                  (커스텀 UI 구현 필요)

image-picker는 권한 처리도 os가 해주고 ui도 알아서 만들어줌
하지만 vision-camer는 커스텀 ui가능. 

1. vision-camer설치
npm install react-native-vision-camera
2. ios 네이티브 의존성
cd ios
pod install
cd ..
3. ios 권한 설정
ios는 카메라를 쓰려면 사용자한테 권한 요청해야함
그런데 요청 사유를 미리 시스템에 적어둬야함
frontend/ios/Calo/Info.plist 오픈
파일을 열면 XML 형식 
</dict> 찾기
바로 위에 
<key>NSCameraUsageDescription</key>
<string>음식 사진을 촬영하여 분석하기 위해 카메라를 사용합니다</string>
----------------------------------------------------------------- 
<dict>
    <!-- ... 기존 내용들 ... -->
    
    <key>NSCameraUsageDescription</key>
    <string>음식 사진을 촬영하여 분석하기 위해 카메라를 사용합니다</string>
</dict>
-----------------------------------------------------------------

* info.plist란?
ios 앱의 설정 파일
앱 이름, 버전
권한 요청 사유(카메라 위치, 마이크 등)
지원 화면 방향 등등...
ios는 이 파일을 보고 앱에 어떤 기능이 필요한지 안다

NSCameraUsageDescription = 카메라 사용 사유 테스트. 사용자가 카메라 권한 요청 받을 때 이 글이 표시됨
┌─────────────────────────────┐
│ "Calo" 앱이 카메라에         │
│ 액세스하려고 합니다           │
│                             │
│ 음식 사진을 촬영하여         │
│ 분석하기 위해 카메라를       │
│ 사용합니다                   │
│                             │
│        [거부]   [허용]       │
└─────────────────────────────┘

*** 오류 *** 
[!] Unable to find a specification for `NitroModules` depended upon by `VisionCamera`
npm install react-native-nitro-modules
vision camera 가 NitroModules 라는 별도 라이브러리를 필요로 하는데 그게 설치가안됨
react-native-vision-camera 의 최신 버전(v4 이상)부터 NitroModules 라는 별도 
라이브러리를 의존성 가짐. 근데 이게 npm install 할 때 자동으로 같이 안깔림

[!] Unable to find a specification for `NitroImage` depended upon by `VisionCamera`
또 다른 모듈 NitroImage 이 필요함

4. 권한 요청 + 뷰파인더
vision-camera에서 가장 먼저 해야하는 것은 카메라 사용 권한
화면이 뜨면 권한 상태 확인
권한 없으면 요청
사용자가 허용하면 카메라 띄움
거부하면 안내 메시지

* useEffect 훅
컴포넌트가 그려질 때(또는 특정 값이 바뀔 때) 실행할 코드를 정의하는 훅
useState랑 짝꿍
useState = rkqt rhksfl
useEffect = 부수 효과 실행

셔터 버튼으로 사진 촬영
1. 셔터 버튼 누름
2. 사진 활용
3. 찍은 사진의 경로(위치 파일)를 받음
4. 그 사진 정보랑 함께 result 화면으로 이동
5. ResultScreen에서 그 사진 표시

Vison-camera로 사진을 촬영하려면 <Camera> 컴포넌트를 직접 호출해야함
그럴려면 레퍼런스가 필요함
const camera = useRef<Camera>(null);
useRef = 특정 컴포넌트나 값을 직접 가리키는 변수
리엑트는 기본적으로 useState가 바뀌면 화면을 새로 그리는 방식으로 작동
useRef는 변경돼도 화면을 다시 그리지 않음. 일반 변수 같지만 리엑트가 계속 들고 있음

* async/await
사진 찍기는 시간이 걸리는 작업. 촬영, 저장 등 0.5초정도
자바스크립트에서는 시간 걸리는 작업을 비동기 라고 함
const takePhoto = async () => {
  const photo = await camera.current.takePhoto();
  console.log(photo);  // 사진 찍힌 후 실행
};
async: 이 함수는 시간이 걸린다고 표시
await: 이 작업이 끝날 때까지 기다리라고 명령

* useRoute
naviagtion 객체로 데이터를 보내면 받을 때는 다른 훅을 사용
useRoute() -> 받기(이 화면에 도착할 때 받은 정보)
그리고 얘한테도 타입을 넘겨줌
type ResultRouteProp = RouteProp<RootStackParamList, 'Result'>;
const route = useRoute<ResultRouteProp>();
RouteProp<RootStackParamList, 'Result'> = "RootStack의 Result 화면 라우트 타입"
그러면 route.params 가 { photoPath: string } 으로 인식됨