import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCameraDevice, useCameraPermission, Camera } from 'react-native-vision-camera';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function CameraScreen() {
  const navigation = useNavigation<NavigationProp>();

  // 모바일 앱에서 하드웨어를 사용할 때 반드시 거치는 과정
  const { hasPermission, requestPermission } = useCameraPermission();
  // 스마트폰에 달린 여러 렌즈 중 후면 카메라를 지정. 해당 장치 정보 가져옴
  const device = useCameraDevice('back');
  const camera = useRef<any>(null);

  // 화면이 처음 켜질 때 권한이 없으면 팝업을 띄워 권한 자동으로 요청
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // 사용자가 권한 거부
  if (!hasPermission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>카메라 권한이 필요합니다</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>권한 요청하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (camera.current == null) {
      // 시뮬레이터 등 카메라 없을 때 → 임시 경로로 이동
      navigation.navigate('Result', { photoPath: '' });
      return;
    }

    try {
      //시도할 코드
      const photo = await camera.current.takePhoto();
      navigation.navigate('Result', { photoPath: photo.path });
    } catch (e) {
      // 실패 시 처리할 코드
      console.error('사진 촬영 실패:', e);
    }
  };

  return (
    // 카메라 화면
    <View style={styles.container}>
      <View style={styles.previewSection}>
        {device ? (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>시뮬레이터: 카메라 없음</Text>
            <Text style={styles.placeholderSubtext}>실기기에서 테스트하세요</Text>
          </View>
        )}
      </View>

      // 하단 버튼 영역
      <View style={styles.controlsSection}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonIcon}>🖼️</Text>
          <Text style={styles.sideButtonLabel}>갤러리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shutterButton} onPress={takePhoto}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => navigation.navigate('Result', { photoPath: '' })}
        >
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
    flex: 1,
    backgroundColor: '#000',
  },
  controlsSection: {
    height: 140,
    backgroundColor: '#F5F5F7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default CameraScreen;