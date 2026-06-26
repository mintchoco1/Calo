2.5 통계 및 시각화 (구체화 필요)
- 누적 칼로리 섭취량 그래프
- 주별/월별 영양소 비율 변화
- 식단 이행도(준수율) 트렌드
- 목표 대비 달성도
※ 이 부분은 아직 구체적으로 정해지지 않음.

┌──────────────────────────┐
│ Stats                    │
├──────────────────────────┤
│ 이번 주 평균              │
│ 1,233 kcal              │
├──────────────────────────┤
│ ┌────────────────────┐  │
│ │ 주간 칼로리 차트       │  │ ← 막대그래프
│ │ █  █  █  █  █  █  █  │  │
│ │ 월 화 수 목 금 토 일   │  │
│ └────────────────────┘  │
├──────────────────────────┤
│ 영양소 평균                │
│ 탄: 145g | 단: 52g       │
│ 지: 38g  | 당: 22g       │
└──────────────────────────┘

----------------------------------------------------
차트 라이브러리 추가 (3가지가 있음)
react-native-chart-kit가장 쉬움, 인기 많음
victory-native강력하지만 학습 곡선 있음
react-native-svg-charts유연함, 복잡함

제일 다루기 쉬운 리엑트거 먼저 적용
1. npm install react-native-chart-kit react-native-svg
라이브러리 설치(js 라이브러리)
react-native-chart-kit은 js위주 코드
react-native-svg가 문제. 네이티브 코드(swift,objective-c 같은거)

2. cd ios && pod install && cd ..
추가 작업
ios는 cocoaPods의 패키지 단위
pod install은 그 패키지들을 ios 프로젝트에 통합하는 명령어
npm install react-native-svg
   ↓
JS 레고 블록 + iOS용 레고 블록이 box에 도착

근데 iOS용 레고 블록은 따로 조립해야 함:
   ↓
cd ios && pod install
   ↓
iOS 레고 블록이 너의 앱에 끼워짐
   ↓
cd .. && npx react-native run-ios
   ↓
새로 조립된 앱으로 재빌드 & 설치

네이티브 의존성은 js가 아닌 os가 직접 이해하는 코드로 작성된 라이브러리

3. npx react-native run-ios
다시 빌드. 네이티브 모듈이 들어있어서 빌드를 한 번 다시 해줘야 동작
----------------------------------------------------
Dimensions - 화면 크기 알아내기 
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

Dimensions는 리엑트네이티브 기본 api. 현재 기기의 화면 크기를 보여줌
'window' -> 앱이 보이는 영역
.width -> 가로 픽셀
.height -> 세로 픽셀
예를 들어 아이폰14 시뮬레이터면 width가 약 390이고 아이패드면 더 큼
사용하는 이유는 기기마다 크기가 다름. 근데 차트를 사용하려면 고정된 크기 필요

영양소 평균 카드
┌────────────────────┐
│ 영양소 평균          │
│                    │
│ 탄수화물    145g    │
│ 단백질      52g     │
│ 지방        38g     │
│ 당분        22g     │
└────────────────────┘
map 사용
  const nutrients = [
    { id: 1, name: '탄수화물', value: '145g' },
    { id: 2, name: '단백질', value: '52g' },
    { id: 3, name: '지방', value: '38g' },
    { id: 4, name: '당분', value: '22g' },
  ];
이걸 이용해서 map 사용 하려면 key 사용
id는 key prop용. 배열 렌더링할 땐 항상 고유 id가 필요
{nutrients.map(nutrient => (
  <View key={nutrient.id} style={styles.nutrientRow}>
    <Text style={styles.nutrientLabel}>{nutrient.name}</Text>
    <Text style={styles.nutrientValue}>{nutrient.value}</Text>
  </View>
))}
nutrients 배열의 각 요소에 대해, 그 요소를 nutrient 라고 부르고 → View로 변환