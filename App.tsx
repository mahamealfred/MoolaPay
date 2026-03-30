import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { useThemeMode, ThemeModeProvider } from './src/theme/ThemeModeContext';

import { SplashNavigator } from './src/navigation/SplashNavigator';
import { NavigationContainer } from '@react-navigation/native';

import { createNavigationTheme } from './src/navigation/AppNavigator';
import { BankingDataProvider } from './src/state/BankingDataContext';
import { colors } from './src/theme/tokens';


function AppRoot() {
  const { isDarkMode } = useThemeMode();
  return (
    <BankingDataProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={isDarkMode ? '#0B1320' : colors.primary.main}
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
