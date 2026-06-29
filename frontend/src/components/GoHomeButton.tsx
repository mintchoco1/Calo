import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function GoHomeButton() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Button 
      title="처음으로" 
      onPress={() => navigation.popToTop()} 
    />
  );
}

export default GoHomeButton;