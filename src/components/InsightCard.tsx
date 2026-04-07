import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Insight } from '../types/banking';
import { useColors } from '../theme/ThemeModeContext';

type InsightCardProps = {
  item: Insight;
};

export function InsightCard({ item }: InsightCardProps) {
  const colors = useColors();
  const isUp = item.trend === 'up';

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.trendIcon, { backgroundColor: isUp ? colors.successLight : colors.errorLight }]}>
        <Ionicons name={isUp ? 'trending-up' : 'trending-down'} size={18} color={isUp ? colors.success : colors.error} />
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  trendIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, gap: 2 },
  title: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
  desc: { fontFamily: 'DMSans_500Medium', fontSize: 12, lineHeight: 18 },
});
