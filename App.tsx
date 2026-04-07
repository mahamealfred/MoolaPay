import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { useThemeMode, ThemeModeProvider } from './src/theme/ThemeModeContext';

import { SplashNavigator } from './src/navigation/SplashNavigator';
import { NavigationContainer } from '@react-navigation/native';

import { createNavigationTheme } from './src/navigation/AppNavigator';
import { BankingDataProvider } from './src/state/BankingDataContext';


function AppRoot() {
  const { isDarkMode, colors } = useThemeMode();
  return (
    <BankingDataProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <NavigationContainer theme={createNavigationTheme(isDarkMode)}>
        <SplashNavigator />
      </NavigationContainer>
    </BankingDataProvider>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <AppRoot />
    </ThemeModeProvider>
  );
}
