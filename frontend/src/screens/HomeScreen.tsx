import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요!</Text>
        <Text style={styles.date}>2026년 5월 28일</Text>
      </View>

      {/* 오늘의 칼로리 카드 */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>오늘 섭취량</Text>
        <Text style={styles.calorieNumber}>1,250</Text>
        <Text style={styles.calorieUnit}>/ 2,000 kcal</Text>
      </View>

      {/* 영양소 카드들 */}
      <View style={styles.nutrientRow}>
        <View style={styles.nutrientCard}>
          <Text style={styles.nutrientLabel}>탄수화물</Text>
          <Text style={[styles.nutrientValue, { color: colors.carbs }]}>120g</Text>
        </View>
        <View style={styles.nutrientCard}>
          <Text style={styles.nutrientLabel}>단백질</Text>
          <Text style={[styles.nutrientValue, { color: colors.protein }]}>60g</Text>
        </View>
        <View style={styles.nutrientCard}>
          <Text style={styles.nutrientLabel}>지방</Text>
          <Text style={[styles.nutrientValue, { color: colors.fat }]}>40g</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  date: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  calorieNumber: {
    ...typography.display,
    color: colors.primary,
  },
  calorieUnit: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  nutrientRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  nutrientCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
  },
  nutrientLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  nutrientValue: {
    ...typography.h3,
  },
});

export default HomeScreen;