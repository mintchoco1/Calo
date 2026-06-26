┌──────────────────────────┐
│ Calendar (헤더, 탭바 안)  │
├──────────────────────────┤
│                          │
│   <  2026년 6월  >        │ ← 월 이동
│                          │
│   일 월 화 수 목 금 토      │
│           1  2  3  4  5  │
│    6  7  8  9 10 11 12   │ ← 달력
│   13 14 15 16 17 18 19   │
│   20 21 22 23 24 25 26   │
│   27 28 29 30            │
│                          │
├──────────────────────────┤
│ 6월 22일 (월)             │
│                          │
│ ┌──┐ 아침       300 kcal  │
│ │📷│ 토스트                │ ← 선택한 날짜의 식사
│ └──┘                     │
│ ...                      │
└──────────────────────────┘

외부 라이브러리 도입
달력 UI는 직접 만들기 너무 힘듦
react-native-calendars 라이브러리 가져다가 씀
달력 그리기 + 날짜 선택 자동처리
다양한 커스터마이징
점/색깔로 특정 날짜 마킹 가능(식사 기록 있는 날 표시)

먼저 프론트 폴더에 들어가서 라이브러리 설치
npm install react-native-calendars
import { Calendar } from 'react-native-calendars'; 로 컴포넌트 가져오기
<Calendar /> 쓰면 끝. 이거 한 줄로 달력이 그려짐

------------------------------------------------

{selectedDate === '' ? (
  <Text>날짜를 선택해주세요</Text>
) : meals.length === 0 ? (
  <Text>이 날짜에 기록이 없습니다</Text>
) : (
  meals.map(meal => (
    <View>...</View>
  ))
)}

1. 선택한 날짜가 없으면 "날짜를 선택해주세요"
2. 그게 아니면 선택한 날의 식사가 없으면 이 날짜에 기록이 없다고 표시
3. 그것도 아니면 식사 리스트 그리기
삼항 연산자를 두 번 중첩

* 새로운 textalign
textalign: center -> 텍스트를 가로 가운데 정렬
영역 안에 글자를 가운데로 모음

allignitems: center -> view의 자식들을 가운데로
textallign: center -> 텍스트 자체를 가운데로 정렬. Text 컴포넌트 전용

----------------------------------------------------
식사 기록이 있는 날짜는 . 표시 디테일 추가

일 월 화 수 목 금 토
        1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
        ●  ●  ●         ← 16, 17, 18일에 기록 있음
20 21 22 23 24 25 26
●  ●  ●                 ← 20, 21, 22일에 기록 있음
27 28 29 30

객체에 동적으로 키 추가
지금까지의 markedDates
markedDates={{
  [selectedDate]: {
    selected: true,
    selectedColor: '#007AFF',
  },
}}
선택된 날짜 하나만 표시. 이번엔 모든 기록이 있는 날에 점 표시. 두 가지 표시가 겹쳐야함
markedDates={Object.keys(mealsByDate).reduce((acc, date) => {
  acc[date] = {
    marked: true,
    dotColor: '#007AFF',
    ...(date === selectedDate && {
      selected: true,
      selectedColor: '#007AFF',
    }),
  };
  return acc;
}, {} as any)}
