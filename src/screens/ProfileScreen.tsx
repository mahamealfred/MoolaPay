import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode } from '../theme/ThemeModeContext';
import { colors, spacing, radii } from '../theme/tokens';
import { SectionTitle } from '../components/SectionTitle';
import { GradientShell } from '../components/GradientShell';


export function ProfileScreen() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const navigation = useNavigation() as any;

  function handleLogout() {
    // In a real app, clear auth tokens and user state here
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive', onPress: () => {
          // Navigate to SignIn screen (replace stack)
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' as any }] });
        }
      }
    ]);
  }

  return (
    <GradientShell>
      <View style={styles.root}>
        <SectionTitle title="Profile" subtitle="Account and security details" />

        <View style={styles.card}>
          <View style={styles.identityRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LB</Text>
            </View>
            <View>
              <Text style={styles.name}>Leathitia Bwiza</Text>
              <Text style={styles.meta}>Premium Client</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.endpointLabel}>Connected API Gateway</Text>
          <Text style={styles.endpoint}>api.moola-enterprise.com</Text>
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        <View style={styles.settingsStack}>
          <Pressable style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.settingsTitle}>Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <Ionicons name="notifications-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.settingsTitle}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <Ionicons name="moon-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.settingsTitle}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#CFD8E3', true: 'rgba(21, 107, 91, 0.45)' }}
              thumbColor={isDarkMode ? colors.mint : '#F8FBFF'}
            />
          </View>
          <Pressable style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <Ionicons name="help-circle-outline" size={18} color={colors.textPrimary} />
              <Text style={styles.settingsTitle}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>
    </GradientShell>
  );
}

// ...existing code...
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#1B3B61',
    borderWidth: 1,
    borderColor: '#365172',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  name: {
    color: colors.textPrimary,
    fontFamily: 'Sora_700Bold',
    fontSize: 20,
  },
  meta: {
    marginTop: 2,
    color: colors.textSecondary,
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
  divider: {
    marginVertical: spacing.md,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
  },
  endpointLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'DMSans_700Bold',
  },
  endpoint: {
    marginTop: 4,
    color: colors.sky,
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  settingsStack: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.panel,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsTitle: {
    color: colors.textPrimary,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  logoutBtn: {
    marginTop: 32,
    backgroundColor: colors.coral,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutText: {
    color: colors.primary.contrast,
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
    letterSpacing: 1,
  },
});
