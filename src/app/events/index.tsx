import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { Chip } from '@/components/chip';
import { DemoDataBadge } from '@/components/demo-data-badge';
import { EventCard } from '@/components/event-card';
import { FilterSelect, type FilterOption } from '@/components/filter-select';
import { IconButton } from '@/components/icon-button';
import { Screen } from '@/components/screen';
import { SearchBar } from '@/components/search-bar';
import { StatusView } from '@/components/status-view';
import { Spacing } from '@/constants/theme';
import { eventTypes, type EventType, type SampleEvent } from '@/data/sample-events';
import { useSampleEvents } from '@/hooks/use-sample-events';

const tabs = [
  { value: 'events', label: 'Events' },
  { value: 'athletes', label: 'Athletes' },
  { value: 'causes', label: 'Causes' },
  { value: 'organizations', label: 'Organizations' },
] as const;

type Tab = (typeof tabs)[number]['value'];

type Distance = 'any' | '5' | '10' | '25';
type DateRange = 'any' | '7' | '30';
type TypeFilter = 'any' | EventType;

const distanceOptions: FilterOption<Distance>[] = [
  { value: 'any', label: 'Any distance' },
  { value: '5', label: 'Within 5 mi' },
  { value: '10', label: 'Within 10 mi' },
  { value: '25', label: 'Within 25 mi' },
];

const dateOptions: FilterOption<DateRange>[] = [
  { value: 'any', label: 'Any date' },
  { value: '7', label: 'Next 7 days' },
  { value: '30', label: 'Next 30 days' },
];

const typeOptions: FilterOption<TypeFilter>[] = [
  { value: 'any', label: 'All types' },
  ...eventTypes.map((type) => ({ value: type, label: type })),
];

const DAY_MS = 24 * 60 * 60 * 1000;

function matchesFilters(
  event: SampleEvent,
  query: string,
  distance: Distance,
  dateRange: DateRange,
  type: TypeFilter
) {
  const text = `${event.title} ${event.type} ${event.location} ${event.description}`.toLowerCase();
  if (query && !text.includes(query.toLowerCase())) return false;
  if (distance !== 'any' && event.distanceMiles > Number(distance)) return false;
  if (type !== 'any' && event.type !== type) return false;
  if (dateRange !== 'any') {
    const daysAway = (new Date(event.startsAt).getTime() - Date.now()) / DAY_MS;
    if (daysAway < 0 || daysAway > Number(dateRange)) return false;
  }
  return true;
}

export default function EventsScreen() {
  // Home links here with `q` (search) and `tab` preset in the URL
  const params = useLocalSearchParams<{ q?: string; tab?: string }>();
  const tab: Tab = tabs.some((item) => item.value === params.tab) ? (params.tab as Tab) : 'events';

  // Typing stays local (URL updates per keystroke drop characters); a new `q` from Home replaces it
  const [query, setQuery] = useState(params.q ?? '');
  const [prevParamQuery, setPrevParamQuery] = useState(params.q);
  if (params.q !== prevParamQuery) {
    setPrevParamQuery(params.q);
    setQuery(params.q ?? '');
  }

  const [showFilters, setShowFilters] = useState(true);
  const [distance, setDistance] = useState<Distance>('any');
  const [dateRange, setDateRange] = useState<DateRange>('any');
  const [type, setType] = useState<TypeFilter>('any');

  const { status, events, retry } = useSampleEvents();
  const results = events.filter((event) =>
    matchesFilters(event, query.trim(), distance, dateRange, type)
  );
  const tabLabel = tabs.find((item) => item.value === tab)?.label ?? 'Events';

  return (
    <Screen header={<AppHeader showBack />}>
      <View style={styles.searchRow}>
        <SearchBar value={query} onChangeText={setQuery} />
        <IconButton
          label={showFilters ? 'Hide filters' : 'Show filters'}
          selected={showFilters}
          ios="slider.horizontal.3"
          md="tune"
          onPress={() => setShowFilters((value) => !value)}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        accessibilityRole="tablist">
        {tabs.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={item.value === tab}
            onPress={() => router.setParams({ tab: item.value })}
          />
        ))}
      </ScrollView>

      {showFilters && tab === 'events' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}>
          <FilterSelect label="Nearby" options={distanceOptions} value={distance} onChange={setDistance} />
          <FilterSelect label="Date" options={dateOptions} value={dateRange} onChange={setDateRange} />
          <FilterSelect label="Event Type" options={typeOptions} value={type} onChange={setType} />
        </ScrollView>
      )}

      <DemoDataBadge />

      {tab !== 'events' ? (
        <StatusView
          kind="empty"
          title={`No ${tabLabel.toLowerCase()} to show yet`}
          message={`${tabLabel} are coming soon. Only demo events are available for now.`}
        />
      ) : status === 'loading' ? (
        <StatusView kind="loading" />
      ) : status === 'error' ? (
        <StatusView kind="error" onRetry={retry} />
      ) : events.length === 0 ? (
        <StatusView kind="empty" title="No events yet" message="Check back soon for upcoming events." />
      ) : results.length === 0 ? (
        <StatusView
          kind="empty"
          title="No events match"
          message="Try a different search or clear some filters."
        />
      ) : (
        <View accessibilityLabel={`${results.length} events`}>
          {results.map((event) => (
            <EventCard key={event.id} event={event} variant="listing" />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  chipRow: {
    gap: Spacing.two,
  },
});
