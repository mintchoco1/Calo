import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function AnalyzeButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Button 
      title="분석 결과 보기" 
      onPress={() => navigation.navigate('Result')} 
    />
  );
}

export default AnalyzeButton;