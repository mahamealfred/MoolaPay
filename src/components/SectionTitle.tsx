import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/tokens';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: 'Sora_700Bold',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
});
