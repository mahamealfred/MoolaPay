import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/tokens';

type GradientShellProps = {
  children: ReactNode;
};

export function GradientShell({ children }: GradientShellProps) {
  return (
    <LinearGradient
      colors={[colors.primary.main, colors.primary.light, colors.primary.dark]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.inner}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
