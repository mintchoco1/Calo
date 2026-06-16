import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CameraButton from '../components/CameraButton';

function HomeScreen() {
  const meals = [
    { id: 1, time: '아침', name: '토스트', calories: 300 },
    { id: 2, time: '점심', name: '김치찌개', calories: 500 },
    { id: 3, time: '저녁', name: '샐러드', calories: 200 },
  ]; //mock data

  return (
    <View style={styles.container}>
      <View style={styles.dateSection}>
        <Text style={styles.dateLabel}>오늘</Text>
        <Text style={styles.dateValue}>
          {new Date().toLocaleDateString('ko-KR')}
        </Text>
      </View>

      <View style={styles.calorieSection}>
        <Text style={styles.calorieLabel}>오늘 섭취</Text>
        <Text style={styles.calorieValue}>1,247 kcal</Text>

        <View style={styles.nutrientRow}>
          <View style={styles.nutrientItem}>
            <Text style={styles.nutrientName}>탄수화물</Text>
            <Text style={styles.nutrientAmount}>150g</Text>
          </View>
          <View style={styles.nutrientItem}>
            <Text style={styles.nutrientName}>단백질</Text>
            <Text style={styles.nutrientAmount}>60g</Text>
          </View>
          <View style={styles.nutrientItem}>
            <Text style={styles.nutrientName}>지방</Text>
            <Text style={styles.nutrientAmount}>40g</Text>
          </View>
          <View style={styles.nutrientItem}>
            <Text style={styles.nutrientName}>당</Text>
            <Text style={styles.nutrientAmount}>18g</Text>
          </View>
        </View>
      </View>

      <View style={styles.mealsSection}>
        <Text>식단 영역</Text>
      </View>

      <View style={styles.buttonSection}>
        <CameraButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                            //가능한 공간을 다 차지하도록 설정
    padding: 16,
    //justifyContent: 'center',           //세로 중앙 정렬
    //alignItems: 'center',               //가로 중앙 정렬
  },
  dateSection: {
    backgroundColor: '#FFE5E5',
    padding: 16,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
  },
  dateValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  calorieSection: {
    backgroundColor: '#E5F0FF',
    padding: 16,
    marginBottom: 12,
  },
  mealsSection: {
    backgroundColor: '#E5FFE9',
    padding: 16,
    marginBottom: 12,
    flex: 1,
  },
  buttonSection: {
    backgroundColor: '#FFF5E5',
    padding: 16,
  },
  calorieLabel: {
    fontSize: 14,
    color: '#666',
  },
  calorieValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 16,
  },
  nutrientRow: {
    flexDirection: 'row',                 //RN의 기본은 세로 쌓기인데 이렇게 하면 가로로 쌓음
    justifyContent: 'space-around',       //자식들 사이의 간격을 어떻게 배치할지 설정
  },
  nutrientItem: {
    alignItems: 'center',                 //flexDirection 반대 방향으로 정렬
  },
  nutrientName: {
    fontSize: 12,
    color: '#666',
  },
  nutrientAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default HomeScreen;              //HomeScreen 컴포넌트를 내보냅니다. 다른 파일에서 이 컴포넌트를 사용할 수 있도록 합니다.