import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Tag } from './chip';
import { Icon } from './icon';
import { ImagePlaceholder } from './image-placeholder';
import { MetaRow } from './meta-row';
import { SaveButton } from './save-button';
import { ThemedText } from './themed-text';

import { Spacing } from '@/constants/theme';
import { formatEventDate, type SampleEvent } from '@/data/sample-events';
import { useTheme } from '@/hooks/use-theme';

type EventCardProps = {
  event: SampleEvent;
  /** `compact`: Home featured card. `listing`: Events list row with description and save. */
  variant: 'compact' | 'listing';
};

export function EventCard({ event, variant }: EventCardProps) {
  const theme = useTheme();
  const date = formatEventDate(event.startsAt);
  const href = { pathname: '/events/[id]', params: { id: event.id } } as const;
  const label = `${event.title}, ${event.type}, ${date}, ${event.location}`;

  if (variant === 'compact') {
    return (
      <Link href={href} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={label}
          // Link asChild needs one flat style object (no arrays or style functions)
          style={StyleSheet.flatten([
            styles.compactCard,
            { borderColor: theme.border, backgroundColor: theme.background },
          ])}>
          <ImagePlaceholder style={styles.compactImage} iconSize={36} />
          <View style={styles.compactBody}>
            <View style={styles.compactText}>
              <ThemedText type="smallBold" numberOfLines={1}>
                {event.title}
              </ThemedText>
              <MetaRow ios="calendar" md="calendar_today">
                {date}
              </MetaRow>
              <MetaRow ios="mappin.and.ellipse" md="location_on">
                {event.location}
              </MetaRow>
            </View>
            <Icon ios="chevron.right" md="chevron_right" size={16} color="textSecondary" />
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <View style={[styles.listingCard, { borderBottomColor: theme.border }]}>
      <Link href={href} asChild>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${label}. ${event.description}`}
          style={styles.listingPressable}>
          <ImagePlaceholder style={styles.listingImage} />
          <View style={styles.listingText}>
            <ThemedText type="smallBold" numberOfLines={2} style={styles.listingTitle}>
              {event.title}
            </ThemedText>
            <Tag label={event.type} />
            <MetaRow ios="calendar" md="calendar_today">
              {date}
            </MetaRow>
            <MetaRow ios="mappin.and.ellipse" md="location_on">
              {event.location}
            </MetaRow>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
              {event.description}
            </ThemedText>
          </View>
          <Icon ios="chevron.right" md="chevron_right" size={18} color="textSecondary" />
        </Pressable>
      </Link>
      {/* Sibling of the link, not nested, so screen readers get two separate controls */}
      <View style={styles.saveButton}>
        <SaveButton eventId={event.id} eventTitle={event.title} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compactCard: {
    // Equal widths regardless of text length
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    borderWidth: 1,
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  compactImage: {
    height: 96,
  },
  compactBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    padding: Spacing.two,
  },
  compactText: {
    flex: 1,
    gap: Spacing.half,
  },
  listingCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.three,
  },
  listingPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  listingImage: {
    width: 112,
    alignSelf: 'stretch',
    minHeight: 104,
    borderRadius: Spacing.one,
  },
  listingText: {
    flex: 1,
    gap: Spacing.one,
  },
  listingTitle: {
    fontSize: 16,
    lineHeight: 22,
    // Leaves room for the save button in the top-right corner
    paddingRight: 36,
  },
  saveButton: {
    position: 'absolute',
    top: Spacing.two,
    right: -Spacing.two,
  },
});
