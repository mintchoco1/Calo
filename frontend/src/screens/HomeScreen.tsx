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
        <Text style={styles.mealsTitle}>오늘의 식단</Text>
        {meals.length === 0 ? (
          /*비어있을 때 표시할 JSX*/
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>오늘의 식단이 없습니다.</Text>
            <Text style={styles.emptySubtext}>사진을 찍어 식단을 추가해보세요!</Text>
          </View>
        ) : (
          /* 식단이 있을 때 표시할 JSX */
          meals.map((meal) => (
            <View key={meal.id} style={styles.mealItem}>
              <View style={styles.thumbnail}>
                <Text style={styles.thumbnailIcon}>📷</Text>
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealName}>{meal.name}</Text>
              </View>
              <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
            </View>
          ))
        )}
      </View>

      <View>
        <CameraButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F7',     // 연한 회색 배경
  },

  // 날짜 카드
  dateSection: {
    backgroundColor: '#FFFFFF',     // 흰색
    padding: 16,
    borderRadius: 12,               // 둥근 모서리
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

  // 칼로리 카드
  calorieSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutrientItem: {
    alignItems: 'center',
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

  // 식사 리스트 카드
  mealsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flex: 1,                        // 남은 공간 차지
  },
  mealsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  mealTime: {
    fontSize: 12,
    color: '#666',
  },
  mealName: {
    fontSize: 16,
    marginTop: 2,
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // 버튼 영역
  buttonSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },

  thumbnail: {
    width: 48,
    height: 48,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thumbnailIcon: {
    fontSize: 20,
  },
  mealInfo: {
    flex: 1,          //남는 가로 공간 차지하라
  },
});

export default HomeScreen;              //HomeScreen 컴포넌트를 내보냅니다. 다른 파일에서 이 컴포넌트를 사용