import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function CameraScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.previewSection}>
        <Text>Camera PreviewSection</Text>
      </View>

      <View style={styles.controlsSection}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>🖼️</Text>
          <Text style={styles.sideButtonLabel}>갤러리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shutterButton}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideButton} onPress={() => navigation.navigate('Result' as never)}>
          <Text style={styles.sideButtonIcon}>✓</Text>
          <Text style={styles.sideButtonLabel}>분석</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewSection: {
    flex: 1,                          // 남는 공간 다 차지
    backgroundColor: '#E0E0E0',       // 회색 (placeholder)
    justifyContent: 'center',
    alignItems: 'center',
  },

  controlsSection: {
    height: 140,
    backgroundColor: '#F5F5F7',
    flexDirection: 'row',              // 가로 배치!
    justifyContent: 'space-around',    // 3개 균등 분배
    alignItems: 'center',              // 세로 가운데
  },
  sideButton: {
    alignItems: 'center',
    width: 60,
  },
  sideButtonIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  sideButtonLabel: {
    fontSize: 12,
    color: '#666',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,                  // 원형 만들기
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,                  // 안쪽도 원형
    backgroundColor: '#007AFF',
  },
});

export default CameraScreen;