import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View, StyleSheet } from 'react-native';
import { useState } from 'react';

import { CardsScreen } from '../screens/CardsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { PinEntryScreen } from '../screens/PinEntryScreen';
import { PaymentsScreen } from '../screens/PaymentsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { useThemeMode } from '../theme/ThemeModeContext';
import { colors } from '../theme/tokens';

// ============== Types ==============
export type RootTabsParamList = {
  Home: undefined;
  Payments:
    | {
        initialMode?: 'transfer' | 'bill';
        initialService?: string;
      }
    | undefined;
  Cards: undefined;
  Insights: undefined;
  Profile: undefined;
};

type TabRoute = keyof RootTabsParamList;

type EntryStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  PinEntry: undefined;
};

function getTabIcon(routeName: TabRoute): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case 'Home':
      return 'grid';
    case 'Payments':
      return 'swap-horizontal';
    case 'Cards':
      return 'card';
    case 'Insights':
      return 'analytics';
    default:
      return 'person';
  }
}

// ============== Theme ==============
export const createNavigationTheme = (isDarkMode: boolean): Theme => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: isDarkMode ? '#0B1320' : colors.primary.main,
    card: isDarkMode ? '#111C2E' : colors.panel,
    text: isDarkMode ? '#F4F8FF' : colors.textPrimary,
    border: isDarkMode ? '#20324D' : colors.line,
    primary: colors.mint,
    notification: colors.mint,
  },
});

const createTabBarStyles = (isDarkMode: boolean) => ({
  backgroundColor: isDarkMode ? '#111C2E' : colors.primary.dark,
  borderTopColor: isDarkMode ? '#20324D' : '#355AA3',
  borderTopWidth: 1,
  borderRadius: 24,
  height: Platform.OS === 'ios' ? 86 : 74,
  paddingBottom: Platform.OS === 'ios' ? 18 : 10,
  paddingTop: 10,
  paddingHorizontal: 10,
  // Removed absolute positioning and margins to respect safe area and device navigation
  elevation: 0,
  shadowColor: isDarkMode ? '#000000' : colors.primary.dark,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: isDarkMode ? 0.35 : 0.12,
  shadowRadius: 18,
} as const);

const createScreenOptions = (
  routeName: TabRoute,
  isDarkMode: boolean,
): BottomTabNavigationOptions => {
  const activeTint = colors.mint;
  const inactiveTint = isDarkMode ? '#8EA3BF' : '#8D98A6';

  return {
    headerShown: false,
    tabBarStyle: createTabBarStyles(isDarkMode),
    tabBarActiveTintColor: activeTint,
    tabBarInactiveTintColor: inactiveTint,
    tabBarShowLabel: true,
    tabBarHideOnKeyboard: true,
    tabBarItemStyle: styles.item,
    tabBarLabelStyle: {
      fontFamily: 'DMSans_700Bold',
      fontSize: 11,
      fontWeight: '600',
      marginTop: 2,
    },
    tabBarIcon: ({ color, size }) => (
      <View
        style={
          color === activeTint
            ? [styles.activeIconWrap, isDarkMode && styles.activeIconWrapDark]
            : styles.iconWrap
        }
      >
        <Ionicons name={getTabIcon(routeName)} size={size} color={color} />
      </View>
    ),
  };
};

// ============== Navigator Component ==============
const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<EntryStackParamList>();

function MainTabs() {
  const { isDarkMode } = useThemeMode();

  return (
    <Tab.Navigator screenOptions={({ route }) => createScreenOptions(route.name as TabRoute, isDarkMode)}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Payments" component={PaymentsScreen} options={{ title: 'Payments' }} />
      <Tab.Screen name="Cards" component={CardsScreen} options={{ title: 'Cards' }} />
      <Tab.Screen name="Insights" component={InsightsScreen} options={{ title: 'Insights' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isDarkMode } = useThemeMode();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [pendingIdentifier, setPendingIdentifier] = useState('');

  return (
    <SafeAreaProvider>
      {isSignedIn ? (
        <MainTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!showSignIn ? (
            <Stack.Screen name="Onboarding">
              {() => <OnboardingScreen onContinue={() => setShowSignIn(true)} />}
            </Stack.Screen>
          ) : null}
          {showSignIn && !pendingIdentifier ? (
            <Stack.Screen name="SignIn">
              {() => (
                <SignInScreen
                  onBack={() => setShowSignIn(false)}
                  onSignIn={(identifier) => setPendingIdentifier(identifier)}
                />
              )}
            </Stack.Screen>
          ) : null}
          {showSignIn && pendingIdentifier ? (
            <Stack.Screen name="PinEntry">
              {() => (
                <PinEntryScreen
                  identifier={pendingIdentifier}
                  onBack={() => setPendingIdentifier('')}
                  onVerified={() => setIsSignedIn(true)}
                />
              )}
            </Stack.Screen>
          ) : null}
        </Stack.Navigator>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 18,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 107, 91, 0.12)',
  },
  activeIconWrapDark: {
    backgroundColor: 'rgba(21, 107, 91, 0.24)',
  },
});