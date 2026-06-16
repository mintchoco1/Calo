import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function GoHomeButton() {
  const navigation = useNavigation();

  return (
    <Button 
      title="처음으로" 
      onPress={() => (navigation as any).popToTop()} //임시 방편
    />
  );
}

export default GoHomeButton;