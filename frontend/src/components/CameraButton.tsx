import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CameraButton() {
  const navigation = useNavigation();

  return (
    <Button 
      title="사진 찍기" 
      onPress={() => navigation.navigate('Camera' as never)} 
    />
  );
}

export default CameraButton;