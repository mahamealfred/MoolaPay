import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { SignUpScreen } from '../screens/SignUpScreen';
import { CreatePinScreen } from '../screens/CreatePinScreen';
import { FingerprintScreen } from '../screens/FingerprintScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';
import { RequestMoneyScreen } from '../screens/RequestMoneyScreen';
import { TransferToBankScreen } from '../screens/TransferToBankScreen';
import { SplitBillScreen } from '../screens/SplitBillScreen';
import { InvoiceScreen } from '../screens/InvoiceScreen';
import { ActivityScreen } from '../screens/ActivityScreen';
import { QRCodeScreen } from '../screens/QRCodeScreen';
import { CurrencyExchangeScreen } from '../screens/CurrencyExchangeScreen';
import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';
import { useThemeMode, useColors } from '../theme/ThemeModeContext';
import { lightColors, darkColors } from '../theme/tokens';

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

export type RootStackParamList = {
  MainTabs: undefined;
  Notifications: undefined;
  SendMoney: undefined;
  RequestMoney: undefined;
  TransferToBank: undefined;
  SplitBill: undefined;
  Invoice: undefined;
  Activity: undefined;
  QRCode: undefined;
  CurrencyExchange: undefined;
  TransactionDetail: { transaction: import('../types/banking').Transaction };
};

type TabRoute = keyof RootTabsParamList;

type EntryStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  PinEntry: undefined;
  CreatePin: undefined;
  Fingerprint: undefined;
};

function getTabIcon(routeName: TabRoute): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Payments':
      return 'swap-horizontal';
    case 'Cards':
      return 'card';
    case 'Insights':
      return 'stats-chart';
    default:
      return 'person';
  }
}

// ============== Theme ==============
export const createNavigationTheme = (isDarkMode: boolean): Theme => {
  const c = isDarkMode ? darkColors : lightColors;
  return {
    ...DefaultTheme,
    dark: isDarkMode,
    colors: {
      ...DefaultTheme.colors,
      background: c.background,
      card: c.surface,
      text: c.textPrimary,
      border: c.border,
      primary: c.primary,
      notification: c.primary,
    },
  };
};

const createTabBarStyles = (isDarkMode: boolean, bottomInset: number) => {
  const c = isDarkMode ? darkColors : lightColors;
  const paddingBottom = Math.max(Platform.OS === 'ios' ? 24 : 8, bottomInset);
  const baseHeight = Platform.OS === 'ios' ? 64 : 60;

  return {
    backgroundColor: c.tabBar,
    borderTopColor: c.tabBarBorder,
    borderTopWidth: 1,
    height: baseHeight + paddingBottom,
    paddingBottom: paddingBottom,
    paddingTop: 8,
    elevation: 0,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  } as const;
};

const createScreenOptions = (
  routeName: TabRoute,
  isDarkMode: boolean,
  bottomInset: number
): BottomTabNavigationOptions => {
  const c = isDarkMode ? darkColors : lightColors;
  const activeTint = c.tabBarActive;
  const inactiveTint = c.tabBarInactive;

  return {
    headerShown: false,
    tabBarStyle: createTabBarStyles(isDarkMode, bottomInset),
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
            ? [styles.activeIconWrap, { backgroundColor: isDarkMode ? 'rgba(59,130,246,0.15)' : 'rgba(37,99,235,0.1)' }]
            : styles.iconWrap
        }
      >
        <Ionicons name={getTabIcon(routeName)} size={22} color={color} />
      </View>
    ),
  };
};

// ============== Navigator Component ==============
const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createNativeStackNavigator<EntryStackParamList>();
const AppStack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const { isDarkMode } = useThemeMode();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={({ route }) => createScreenOptions(route.name as TabRoute, isDarkMode, insets.bottom)}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Payments" component={PaymentsScreen} options={{ title: 'Payments' }} />
      <Tab.Screen name="Cards" component={CardsScreen} options={{ title: 'Cards' }} />
      <Tab.Screen name="Insights" component={InsightsScreen} options={{ title: 'Insights' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

function MainAppStack() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="MainTabs" component={TabNavigator} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="SendMoney" component={SendMoneyScreen} />
      <AppStack.Screen name="RequestMoney" component={RequestMoneyScreen} />
      <AppStack.Screen name="TransferToBank" component={TransferToBankScreen} />
      <AppStack.Screen name="SplitBill" component={SplitBillScreen} />
      <AppStack.Screen name="Invoice" component={InvoiceScreen} />
      <AppStack.Screen name="Activity" component={ActivityScreen} />
      <AppStack.Screen name="QRCode" component={QRCodeScreen} />
      <AppStack.Screen name="CurrencyExchange" component={CurrencyExchangeScreen} />
      <AppStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
    </AppStack.Navigator>
  );
}

export function AppNavigator() {
  const { isDarkMode } = useThemeMode();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [pendingIdentifier, setPendingIdentifier] = useState('');
  const [showCreatePin, setShowCreatePin] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);

  if (isSignedIn) {
    return (
      <SafeAreaProvider>
        <MainAppStack />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!showSignIn && !showSignUp ? (
          <Stack.Screen name="Onboarding">
            {() => (
              <OnboardingScreen
                onContinue={() => setShowSignIn(true)}
                onSignUp={() => setShowSignUp(true)}
              />
            )}
          </Stack.Screen>
        ) : null}

        {showSignUp && !showCreatePin ? (
          <Stack.Screen name="SignUp">
            {() => (
              <SignUpScreen
                onBack={() => setShowSignUp(false)}
                onSignUp={(identifier) => {
                  setPendingIdentifier(identifier);
                  setShowCreatePin(true);
                }}
              />
            )}
          </Stack.Screen>
        ) : null}

        {showCreatePin && !showFingerprint ? (
          <Stack.Screen name="CreatePin">
            {() => (
              <CreatePinScreen
                onBack={() => setShowCreatePin(false)}
                onPinCreated={() => setShowFingerprint(true)}
              />
            )}
          </Stack.Screen>
        ) : null}

        {showFingerprint ? (
          <Stack.Screen name="Fingerprint">
            {() => (
              <FingerprintScreen
                onBack={() => setShowFingerprint(false)}
                onComplete={() => setIsSignedIn(true)}
              />
            )}
          </Stack.Screen>
        ) : null}

        {showSignIn && !pendingIdentifier ? (
          <Stack.Screen name="SignIn">
            {() => (
              <SignInScreen
                onBack={() => setShowSignIn(false)}
                onSignIn={(identifier) => setPendingIdentifier(identifier)}
                onSignUp={() => {
                  setShowSignIn(false);
                  setShowSignUp(true);
                }}
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 18,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});