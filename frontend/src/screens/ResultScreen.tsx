import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoHomeButton from '../components/GoHomeButton';

function ResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Result Screen</Text>
      <GoHomeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ResultScreen;