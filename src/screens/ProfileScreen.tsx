import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeMode, useColors } from '../theme/ThemeModeContext';

export function ProfileScreen() {
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const colors = useColors();
  const navigation = useNavigation() as any;

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout', style: 'destructive', onPress: () => {
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' as any }] });
        }
      }
    ]);
  }

  const settingsItems = [
    { icon: 'person-outline' as const, label: 'Edit Profile', hasArrow: true },
    { icon: 'shield-checkmark-outline' as const, label: 'Security', hasArrow: true },
    { icon: 'notifications-outline' as const, label: 'Notifications', hasArrow: true },
    { icon: 'moon-outline' as const, label: 'Dark Mode', isDarkModeToggle: true },
    { icon: 'language-outline' as const, label: 'Language', hasArrow: true },
    { icon: 'help-circle-outline' as const, label: 'Help Center', hasArrow: true },
    { icon: 'document-text-outline' as const, label: 'Terms & Privacy', hasArrow: true },
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Profile</Text>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>LB</Text>
          </View>
          <Text style={[styles.name, { color: colors.textPrimary }]}>Leathitia Bwiza</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>leathitia@moolapay.com</Text>
          <View style={[styles.badgeRow]}>
            <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="star" size={12} color={colors.primary} />
              <Text style={[styles.badgeText, { color: colors.primary }]}>Premium</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.successLight }]}>
              <Ionicons name="shield-checkmark" size={12} color={colors.success} />
              <Text style={[styles.badgeText, { color: colors.success }]}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>142</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Transactions</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>$920</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rewards</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cards</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {settingsItems.map((item, i) => (
            <Pressable key={item.label} style={[styles.settingsRow, i < settingsItems.length - 1 && { borderBottomWidth: 1, borderColor: colors.border }]}>
              <View style={styles.settingsLeft}>
                <View style={[styles.settingsIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name={item.icon} size={18} color={colors.primary} />
                </View>
                <Text style={[styles.settingsLabel, { color: colors.textPrimary }]}>{item.label}</Text>
              </View>
              {item.isDarkModeToggle ? (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                  thumbColor={isDarkMode ? colors.primary : '#F8FBFF'}
                />
              ) : item.hasArrow ? (
                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
              ) : null}
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable style={[styles.logoutBtn, { backgroundColor: colors.errorLight }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
        </Pressable>

        <Text style={[styles.version, { color: colors.textTertiary }]}>MoolaPay v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, gap: 16 },
  pageTitle: { fontFamily: 'Sora_700Bold', fontSize: 24 },
  // Profile Card
  profileCard: { borderRadius: 24, borderWidth: 1, padding: 24, alignItems: 'center', gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  avatarText: { color: '#FFFFFF', fontFamily: 'Sora_700Bold', fontSize: 28 },
  name: { fontFamily: 'Sora_700Bold', fontSize: 22 },
  email: { fontFamily: 'DMSans_500Medium', fontSize: 14 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontFamily: 'DMSans_700Bold', fontSize: 12 },
  // Stats
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16, alignItems: 'center', gap: 4 },
  statValue: { fontFamily: 'Sora_700Bold', fontSize: 20 },
  statLabel: { fontFamily: 'DMSans_500Medium', fontSize: 11 },
  // Settings
  settingsCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
  settingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  settingsLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingsIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingsLabel: { fontFamily: 'DMSans_700Bold', fontSize: 14 },
  // Logout
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 14, paddingVertical: 16 },
  logoutText: { fontFamily: 'DMSans_700Bold', fontSize: 15 },
  version: { textAlign: 'center', fontFamily: 'DMSans_500Medium', fontSize: 12 },
});
