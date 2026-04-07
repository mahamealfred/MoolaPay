import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '../theme/ThemeModeContext';

type GradientShellProps = {
  children: ReactNode;
};

export function GradientShell({ children }: GradientShellProps) {
  const colors = useColors();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.inner}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
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
