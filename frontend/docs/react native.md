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