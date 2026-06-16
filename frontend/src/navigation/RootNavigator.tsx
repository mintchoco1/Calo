import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();

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