import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AnalyzeButton() {
  const navigation = useNavigation();

  return (
    <Button 
      title="분석 결과 보기" 
      onPress={() => navigation.navigate('Result' as never)} 
    />
  );
}

export default AnalyzeButton;