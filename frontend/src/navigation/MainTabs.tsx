import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //설치한 라이브러리에서 탭 navigator를 만드는 함수 가져옴

//각 탭에 해당하는 화면 컴포넌트들을 가져옴(화면들)
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator(); //탭 navigator의 인스턴스를 만듦. Tab.navigator와 Tab.Screen 같이 쓸 수 있게 해줌

function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} /> 
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
        </Tab.Navigator>
    );
}

export default MainTabs;