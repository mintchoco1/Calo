state 상태 매우 중요함

예를 들어 가져오기만한 달력은 날짜를 눌러도 변화x
어떤 날짜를 눌렀는지 기억해야함

UseState 필요함
예를 들어 사용자가 + 버튼을 눌러->음량이 올라감
음량이 변하고 새 음량을 화면에 표시해야함
사용자가 6월 22일 누름->선택된 날짜가 6월22일이됨
그 정보를 기억하고 화면에 표시해야함

usestate 사용법
const [선택한날짜(값), set선택한날짜(값을바꾸는함수)] = useState('초기값');
두 개를 받는 문법임
값: 지금 저장된 값
값을 바꾸는 함수: 그 값을 새로운 값으로 바꿀 때 호출하는 함수
초기값: 처음 시작할 때의 값

const [selectedDate, setSelectedDate] = useState('');
selectedDate: 현재 선택된 날짜 (처음엔 빈 문자열 '')
setSelectedDate: 선택된 날짜를 바꾸는 함수

동작은?
// 처음 화면이 뜰 때
selectedDate === ''   // 비어있음

// 사용자가 22일 클릭
setSelectedDate('2026-06-22')  // 호출!

// 그러면 자동으로:
// 1. selectedDate가 '2026-06-22'로 바뀜
// 2. React가 화면을 다시 그림 (re-render)
// 3. 새 값으로 달력 표시

달력에 두개의 prop추가
<Calendar
  onDayPress={day => {
    setSelectedDate(day.dateString);
  }}
  markedDates={{
    [selectedDate]: {
      selected: true,
      selectedColor: '#007AFF',
    },
  }}
/>
ondayPress는 라이브러리가 자동으로 day객체를 넘겨줌
이 객체에는 dateString 날짜 있음
day.dateString을 setSelectedDate에 넘김 -> state가 변경됨

* props
컴포넌트한테 정보를 전달하는 방법
함수에 인자를 넣는거랑 비슷
// 컴포넌트에 정보 전달
<Calendar onDayPress={...} markedDates={...} />
Calendar라는 컴포넌트에 onDayPress랑 markedDates 라는 정보를 넘김

<Text style={styles.foodName}>김치찌개</Text>
     ↑
     prop (style)

<TouchableOpacity onPress={() => ...}>
                  ↑
                  prop (onPress)

<View key={meal.id} style={...}>
       ↑           ↑
       prop (key)  prop (style)

onDayPress: "날짜 눌렀을 때 이 함수 실행해" 라는 정보
markedDates: "이 날짜들을 이렇게 표시해" 라는 정보
----------------------------------------------------------
function CameraButton() {  // ← props 안 받음
  return <TouchableOpacity ... />;
}

function CameraButton(props) {  // ← props 받음!
  return (
    <TouchableOpacity ...>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}

// 사용
<CameraButton title="사진 찍기" />
<CameraButton title="갤러리에서 선택" />
----------------------------------------------------------

<Calendar
  onDayPress={day => {
    setSelectedDate(day.dateString);
  }}
/>
사용자가 날짜를 누르면 이 함수를 실행해. 그 함수는 day 정보를 받아서 setselecteddate를 호출
라이브러리가 자동으로 day를 넘김
사용자가 22일을 클릭하면 라이브러리가 클릭된 날짜 정보를 객체로 만듦.
{
     dateString: '2026-06-22',
     day: 22,
     month: 6,
     year: 2026,
     timestamp: 1750546800000
   }
우리가 넘긴 함수를 호출하면서 그 객체를 인자로 전달
우리 함수가 day.dateString ('2026-06-22')을 사용