import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

//리턴 안에 있는게 화면에 보여짐
function App() {
  return (
    //가장 바깥 박스
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F1419" />
      <Text style={styles.title}> CALO </Text>
      <Text style={styles.subtitle}> 칼로리 트래커 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#B0BEC5',
  },
});

export default App;