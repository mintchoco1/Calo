import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

function StatsScreen() {
  const weeklyData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [1200, 1500, 1100, 1400, 1300, 1600, 1230],
      },
    ],
  };

  //map 연습용 mock data
  const nutrients = [
    { id: 1, name: '탄수화물', value: '145g' },
    { id: 2, name: '단백질', value: '52g' },
    { id: 3, name: '지방', value: '38g' },
    { id: 4, name: '당분', value: '22g' },
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>이번 주 평균</Text>
        <Text style={styles.cardValue}>1,333 kcal</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>주간 섭취 칼로리</Text>
        <BarChart
          data={weeklyData}        // 주간 데이터
          width={screenWidth - 64} // 화면 너비에서 패딩을 뺀 값. 가로 크기
          height={220}             // 세로 크기
          yAxisLabel=""            // y축 앞에 붙일 글자
          yAxisSuffix=""           // y축 뒤에 붙일 글자
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // 막대 색상
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 색상
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>영양소 섭취량</Text>
        {nutrients.map(nutrient => (
          <View key={nutrient.id} style={styles.nutrientRow}>
            <Text style={styles.nutrientLabel}>{nutrient.name}</Text>
            <Text style={styles.nutrientValue}>{nutrient.value}</Text>
          </View>
        )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#007AFF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 8,
  },

  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  nutrientLabel: {
    fontSize: 16,
    color: '#333',
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatsScreen;