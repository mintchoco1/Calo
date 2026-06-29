import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import GoHomeButton from '../components/GoHomeButton';
import { RootStackParamList } from '../navigation/types';

type ResultRouteProp = RouteProp<RootStackParamList, 'Result'>;

function ResultScreen() {
  const route = useRoute<ResultRouteProp>();
  const { photoPath } = route.params;

  const result = {
    name: '김치찌개',
    calories: 520,
    carbs: 45,
    protein: 28,
    fat: 18,
    sugar: 5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        {photoPath ? (
          <Image source={{ uri: `file://${photoPath}` }} style={styles.image} />
        ) : (
          <>
            <Text style={styles.imageIcon}>📷</Text>
            <Text style={styles.imageLabel}>사진 자리 (placeholder)</Text>
          </>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.foodName}>{result.name}</Text>
        <Text style={styles.calories}>{result.calories} kcal</Text>

        <View style={styles.divider} />

        <Text style={styles.nutrientsTitle}>영양 성분</Text>

        <View style={styles.nutrientRow}>
          <Text style={styles.nutrientLabel}>탄수화물</Text>
          <Text style={styles.nutrientValue}>{result.carbs}g</Text>
        </View>
        <View style={styles.nutrientRow}>
          <Text style={styles.nutrientLabel}>단백질</Text>
          <Text style={styles.nutrientValue}>{result.protein}g</Text>
        </View>
        <View style={styles.nutrientRow}>
          <Text style={styles.nutrientLabel}>지방</Text>
          <Text style={styles.nutrientValue}>{result.fat}g</Text>
        </View>
        <View style={styles.nutrientRow}>
          <Text style={styles.nutrientLabel}>당분</Text>
          <Text style={styles.nutrientValue}>{result.sugar}g</Text>
        </View>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>기록에 저장</Text>
        </TouchableOpacity>

        <GoHomeButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  imageSection: {
    backgroundColor: '#E0E0E0',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageIcon: {
    fontSize: 64,
    marginBottom: 8,
  },
  imageLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoSection: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 20,
  },
  nutrientsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
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
  buttonSection: {
    padding: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;