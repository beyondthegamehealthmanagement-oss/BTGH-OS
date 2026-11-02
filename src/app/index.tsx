import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { AppHeader } from '@/components/app-header';
import { DemoDataBadge } from '@/components/demo-data-badge';
import { EventCard } from '@/components/event-card';
import { Icon, type IconProps } from '@/components/icon';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { Screen } from '@/components/screen';
import { SearchBar } from '@/components/search-bar';
import { StatusView } from '@/components/status-view';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useSampleEvents } from '@/hooks/use-sample-events';
import { useTheme } from '@/hooks/use-theme';

type Category = {
  tab: 'events' | 'athletes' | 'causes' | 'organizations';
  label: string;
  icon: Pick<IconProps, 'ios' | 'md'>;
};

const categories: Category[] = [
  { tab: 'events', label: 'Events', icon: { ios: 'calendar', md: 'calendar_month' } },
  { tab: 'athletes', label: 'Athletes', icon: { ios: 'person.2', md: 'groups' } },
  { tab: 'causes', label: 'Causes', icon: { ios: 'heart', md: 'volunteer_activism' } },
  {
    tab: 'organizations',
    label: 'Organizations',
    icon: { ios: 'building.columns', md: 'account_balance' },
  },
];

const heroSlides = [
  {
    title: 'People × Sports × Health × Impact',
    body: 'Find events, support causes, and make a difference.',
  },
  { title: 'Show up for your community', body: 'Runs, clinics, and workshops near you.' },
  { title: 'Every event has an impact', body: 'See how your participation helps local youth.' },
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();
  const { status, events, retry } = useSampleEvents();

  const featured = events.filter((event) => event.featured).slice(0, width >= 700 ? 3 : 2);

  const search = () => {
    router.push({ pathname: '/events', params: query.trim() ? { q: query.trim() } : {} });
  };

  return (
    <Screen header={<AppHeader showProfile />}>
      <SearchBar value={query} onChangeText={setQuery} onSubmit={search} />

      <View style={styles.categories}>
        {categories.map((category) => (
          <CategoryShortcut key={category.tab} category={category} />
        ))}
      </View>

      <HeroCarousel />

      <View style={styles.sectionHeader}>
        <ThemedText type="smallBold" style={styles.sectionTitle} accessibilityRole="header">
          Featured Events
        </ThemedText>
        <Link href="/events" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="See all events" hitSlop={8}>
            <ThemedText type="small" style={styles.seeAll}>
              See All
            </ThemedText>
          </Pressable>
        </Link>
      </View>

      <DemoDataBadge />

      {status === 'loading' && <StatusView kind="loading" />}
      {status === 'error' && <StatusView kind="error" onRetry={retry} />}
      {status === 'ready' && featured.length === 0 && (
        <StatusView
          kind="empty"
          title="No featured events yet"
          message="Check back soon for upcoming events."
        />
      )}
      {status === 'ready' && featured.length > 0 && (
        <View style={styles.featuredRow}>
          {featured.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))}
        </View>
      )}
    </Screen>
  );
}

function CategoryShortcut({ category }: { category: Category }) {
  const theme = useTheme();

  return (
    <Link href={{ pathname: '/events', params: { tab: category.tab } }} asChild>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Browse ${category.label}`}
        // Link asChild needs one flat style object (no arrays or style functions)
        style={styles.category}>
        <View style={[styles.categoryCircle, { backgroundColor: theme.backgroundElement }]}>
          <Icon {...category.icon} size={26} />
        </View>
        <ThemedText type="small" numberOfLines={1} style={styles.categoryLabel}>
          {category.label}
        </ThemedText>
      </Pressable>
    </Link>
  );
}

function HeroCarousel() {
  const theme = useTheme();
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (slideWidth > 0) {
      setIndex(Math.round(event.nativeEvent.contentOffset.x / slideWidth));
    }
  };

  return (
    <View>
      <View
        style={styles.heroFrame}
        onLayout={(event) => setSlideWidth(event.nativeEvent.layout.width)}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          // Web has no momentum events; scroll end is approximated on each scroll
          onScroll={process.env.EXPO_OS === 'web' ? onScrollEnd : undefined}
          scrollEventThrottle={100}>
          {heroSlides.map((slide, slideIndex) => (
            <View
              key={slide.title}
              style={{ width: slideWidth }}
              accessible
              accessibilityLabel={`Slide ${slideIndex + 1} of ${heroSlides.length}: ${slide.title}. ${slide.body}`}>
              <ImagePlaceholder style={styles.heroImage} iconSize={72} />
              <View style={[styles.heroCaption, { backgroundColor: theme.backgroundElement }]}>
                <ThemedText type="smallBold" style={styles.heroTitle}>
                  {slide.title}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
                  {slide.body}
                </ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {heroSlides.map((slide, dotIndex) => (
          <View
            key={slide.title}
            style={[
              styles.dot,
              { backgroundColor: dotIndex === index ? theme.text : theme.border },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  categoryCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  heroFrame: {
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  heroImage: {
    height: 140,
  },
  heroCaption: {
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  heroTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  seeAll: {
    textDecorationLine: 'underline',
  },
  featuredRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
});
