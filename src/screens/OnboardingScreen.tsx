import { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, Pressable, StyleSheet, Text, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../theme/ThemeModeContext';

type OnboardingScreenProps = {
  onContinue: () => void;
  onSignUp: () => void;
};

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'wallet' as const,
    title: 'Welcome to\nMoolaPay! 👋',
    description: 'Your all-in-one digital wallet for fast, secure payments and smart money management.',
  },
  {
    id: '2',
    icon: 'card' as const,
    title: 'Now Easier to Make\nOnline Payments',
    description: 'Send and receive money instantly. Pay bills, top up airtime, and manage your finances with ease.',
  },
  {
    id: '3',
    icon: 'shield-checkmark' as const,
    title: 'Secure Transactions\n& Reliable Anytime',
    description: 'Your money is protected with end-to-end encryption and biometric authentication.',
  },
  {
    id: '4',
    icon: 'bar-chart' as const,
    title: "Let's Manage Your\nFinancials Now!",
    description: 'Track spending, set budgets, and get smart insights to grow your wealth.',
  },
];

export function OnboardingScreen({ onContinue, onSignUp }: OnboardingScreenProps) {
  const colors = useColors();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      onContinue();
    }
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.illustrationArea, { backgroundColor: colors.primarySoft }]}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
                <Ionicons name={item.icon} size={48} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.textArea}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === activeIndex ? colors.primary : colors.border },
              i === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsArea}>
        <Pressable style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={handleNext}>
          <Text style={styles.primaryBtnText}>
            {activeIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>

        <Pressable onPress={onContinue}>
          <Text style={[styles.secondaryText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
            <Text style={{ color: colors.primary, fontFamily: 'DMSans_700Bold' }}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 60,
    borderRadius: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Sora_700Bold',
    lineHeight: 38,
  },
  description: {
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    borderRadius: 4,
  },
  buttonsArea: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Sora_700Bold',
    fontSize: 16,
  },
  secondaryText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
});