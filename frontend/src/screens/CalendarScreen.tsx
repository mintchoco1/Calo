import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');//처음에는 빈 문자열로 초기화

  const mealsByDate = {
    '2026-06-20': [
      { id: 1, time: '아침', name: '시리얼', calories: 280 },
      { id: 2, time: '점심', name: '비빔밥', calories: 600 },
    ],
    '2026-06-21': [
      { id: 1, time: '점심', name: '파스타', calories: 720 },
    ],
    '2026-06-22': [
      { id: 1, time: '아침', name: '토스트', calories: 350 },
      { id: 2, time: '점심', name: '김치찌개', calories: 520 },
      { id: 3, time: '저녁', name: '샐러드', calories: 280 },
    ],
  };

  // 선택한 날짜의 식사 (없으면 빈 배열)
  const meals = (mealsByDate as any)[selectedDate] || [];

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
        }}
        markedDates={Object.keys(mealsByDate).reduce((acc, date) => {
          acc[date] = {
            marked: true,
            dotColor: '#007AFF',
            ...(date === selectedDate && {
              selected: true,
              selectedColor: '#007AFF',
            }),
          };
          return acc;
        }, {} as any)}    
      />  

      <View style={styles.mealsSection}>
        {selectedDate === '' ? (
          <Text style={styles.placeholder}>날짜를 선택해주세요.</Text>
        ) : meals.length === 0 ? (
          <Text style={styles.placeholder}>선택한 날짜에 식사가 없습니다.</Text>
        ) : (
          meals.map((meal: any) => (
            <View key={meal.id} style={styles.mealItem}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealName}>{meal.name}</Text>
              </View>
              <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  mealsSection: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  mealInfo: {
    flex: 1,
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
});

export default CalendarScreen;