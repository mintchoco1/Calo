import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //React Navigation을 쓰려면 앱 가장 바깥에 한 번

import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;