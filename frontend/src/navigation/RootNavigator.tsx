import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import MainTabs from './MainTabs';
import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';

//타입을 인자로 넘김(제네릭)
//stack을 만들건데 그 stack은 RootStackParamList에 정의된 화면들만 가진
//라이브러리가 그 정보를 받아서 타입 검사를 그 기준으로 해줌
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}                                      //첫 번째 화면이 기본 시작점
                options={{ headerShown: false }}                          //option은 그 화면의 추가 설정. headerShown: false는 화면 상단의 헤더(타이틀 바) 숨김
            />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
    );
}

export default RootNavigator;