import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabsParamList } from '../navigation/types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabsParamList>,
  NativeStackNavigationProp<RootStackParamList>
  >;

function CameraButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Camera')}
    >
      <Text style={styles.buttonText}>📷  사진 찍기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',     //ios 시그니처 블루
    paddingVertical: 16,              //위 아래 여백 -> 버튼 높이
    borderRadius: 12,                 //둥근 모서리
    alignItems: 'center',             //안의 텍스트 가운데 정렬.버튼 자체에 적용
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default CameraButton;