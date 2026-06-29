* TypeScript 정리 - 왜 필요한가
---------------------------------------------------------------
navigation.navigate('Camera' as never)
(navigation as any).popToTop()
const meals: any[] = (mealsByDate as any)[selectedDate] || []
---------------------------------------------------------------
이런식으로 임시 트릭이 있음. 이게 다 typescript 잔소리 우회한 것. 동작은 함.

TypeScript한테 알려주기
"이 앱엔 다른 화면들이 있어. 각 화면이 이름은 ~~, 다른 이름으로 navigate하면 잘못된것"
그러면 TypeScript가 navigate('cmare')로 적으면 이름이 없어서 빨간줄 뜨게 함

* type 키워드
type은 TypeScipt 키워드. 이런 형태의 타입을 만들고 이 이름으로 부른다고 선언
MainTabsParamList 라는 이름의 타입을 만든다
그 타입은 객체 형태고, 세 개의 키(Home, Calendar, Stats)를 가짐
각 키의 값은 undefined (= "이 화면은 파라미터를 안 받음")
undefined는 데이터를 받지 않는다고 선언하는 것
원래 화면을 이동할 때 데이터를 함께 넘길 수 있음

// 데이터 없이 이동
navigation.navigate('Home')

// 데이터 같이 보냄 (예시)
navigation.navigate('Result', { foodName: '김치찌개' })

지금은 화면들이 데이터를 받지 않으니까 다 undefined
나중에 카메라에서 찍은거 화면에 띄울때는 값을 보내야됨

MainTabs: NavigatorScreenParams<MainTabsParamList>
MainTabs는 stack의 한 화면이지만 그 안에 또 다른 navigator가 들어있음
stack=호텔객실(여러 객실)
tab=객실 안의 tv채널
NavigatorScreenParams<MainTabsParamList>가 이 객실에는 tv가 있고 채널은 이거야 라고 알려줌

useNavigation<NativeStackNavigationProp<RootStackParamList>>()
useNavigation<...>() ... 타입의 navigation 객체를 줘
NativeStackNavigationProp stack navigator의 navigation 객체 타입
<RootStackParamList> 그 스택의 하면 목록은 이거다 라고 알려줌

