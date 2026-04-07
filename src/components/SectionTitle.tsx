import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '../theme/ThemeModeContext';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const colors = useColors();

  return (
    <View style={styles.root}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 4 },
  title: {
    fontFamily: 'Sora_700Bold',
    fontSize: 22,
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    lineHeight: 20,
  },
});
