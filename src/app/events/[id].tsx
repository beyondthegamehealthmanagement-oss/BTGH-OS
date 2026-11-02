import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, Share, StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { Tag } from '@/components/chip';
import { DemoDataBadge } from '@/components/demo-data-badge';
import { Icon, type IconProps } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { MetaRow } from '@/components/meta-row';
import { SaveButton } from '@/components/save-button';
import { Screen } from '@/components/screen';
import { StatusView } from '@/components/status-view';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import {
  formatEventDate,
  formatEventTime,
  getSampleEvent,
  type SampleEvent,
} from '@/data/sample-events';
import { useSavedEvents } from '@/hooks/use-saved-events';
import { useTheme } from '@/hooks/use-theme';

const NOTICE_MS = 2500;

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = getSampleEvent(id);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  const header = <AppHeader showBack backFallback="/events" />;

  if (!event) {
    return (
      <Screen header={header}>
        <StatusView
          kind="empty"
          title="Event not found"
          message="This sample event does not exist. Go back to browse events."
        />
      </Screen>
    );
  }

  return (
    <View style={styles.flex}>
      <Screen header={header}>
        <EventDetails event={event} onNotice={setNotice} />
      </Screen>
      {notice && <Notice message={notice} />}
    </View>
  );
}

function EventDetails({
  event,
  onNotice,
}: {
  event: SampleEvent;
  onNotice: (message: string) => void;
}) {
  const theme = useTheme();
  const { isSaved, toggleSaved } = useSavedEvents();
  const saved = isSaved(event.id);
  const date = formatEventDate(event.startsAt);
  const time = formatEventTime(event.startsAt);

  const share = async () => {
    try {
      await Share.share({ message: `${event.title} — ${date}, ${time} at ${event.location}` });
    } catch {
      onNotice('Sharing isn’t available on this device.');
    }
  };

  return (
    <>
      <ImagePlaceholder style={styles.image} iconSize={72} />
      <DemoDataBadge />

      <View style={styles.titleBlock}>
        <Tag label={event.type} />
        <View style={styles.titleRow}>
          <ThemedText style={styles.title} accessibilityRole="header">
            {event.title}
          </ThemedText>
          <SaveButton eventId={event.id} eventTitle={event.title} />
          <IconButton
            label={`Share ${event.title}`}
            ios="square.and.arrow.up"
            md="share"
            onPress={share}
          />
        </View>
        <MetaRow ios="calendar" md="calendar_today" size="default">
          {date}
        </MetaRow>
        <MetaRow ios="clock" md="schedule" size="default">
          {time}
        </MetaRow>
        <MetaRow ios="mappin.and.ellipse" md="location_on" size="default">
          {event.location}
        </MetaRow>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityHint="Registration is not available yet"
        onPress={() => onNotice('Registration is coming soon.')}
        style={({ pressed }) => [
          styles.primaryButton,
          { backgroundColor: theme.primary },
          pressed && styles.pressed,
        ]}>
        <ThemedText type="smallBold" style={{ color: theme.onPrimary }}>
          Register for Event
        </ThemedText>
      </Pressable>

      <View style={styles.actionRow}>
        <ActionButton
          label="Add to Calendar"
          icon={{ ios: 'calendar.badge.plus', md: 'calendar_today' }}
          onPress={() => onNotice('Add to calendar is coming soon.')}
        />
        <ActionButton label="Share" icon={{ ios: 'square.and.arrow.up', md: 'share' }} onPress={share} />
        <ActionButton
          label={saved ? 'Saved' : 'Save'}
          icon={saved ? { ios: 'heart.fill', md: 'heart_check' } : { ios: 'heart', md: 'favorite' }}
          selected={saved}
          onPress={() => toggleSaved(event.id)}
        />
      </View>

      <Section title="About This Event">
        <ThemedText type="small" themeColor="textSecondary">
          {event.about}
        </ThemedText>
      </Section>

      <Section title="Organizer">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Organizer: ${event.organizer}`}
          accessibilityHint="Organizer profiles are not available yet"
          onPress={() => onNotice('Organizer profiles are coming soon.')}
          style={({ pressed }) => [styles.organizerRow, pressed && styles.pressed]}>
          <ImagePlaceholder style={styles.organizerImage} iconSize={20} />
          <ThemedText type="small" style={styles.flex}>
            {event.organizer}
          </ThemedText>
          <Icon ios="chevron.right" md="chevron_right" size={18} color="textSecondary" />
        </Pressable>
      </Section>

      <Section title="Featured Athletes / Guests">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Featured guests: ${event.guests.join(', ')}`}
          accessibilityHint="Guest profiles are not available yet"
          onPress={() => onNotice('Guest profiles are coming soon.')}
          style={({ pressed }) => [styles.guestRow, pressed && styles.pressed]}>
          <View style={styles.guests}>
            {event.guests.map((name) => (
              <View key={name} style={styles.guest}>
                <View style={[styles.avatar, { backgroundColor: theme.placeholder }]}>
                  <Icon ios="person.fill" md="person" size={28} color="placeholderIcon" />
                </View>
                <ThemedText type="small" numberOfLines={2} style={styles.guestName}>
                  {name}
                </ThemedText>
              </View>
            ))}
          </View>
          <Icon ios="chevron.right" md="chevron_right" size={18} color="textSecondary" />
        </Pressable>
      </Section>
    </>
  );
}

function ActionButton({
  label,
  icon,
  onPress,
  selected,
}: {
  label: string;
  icon: Pick<IconProps, 'ios' | 'md'>;
  onPress: () => void;
  selected?: boolean;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={selected === undefined ? undefined : { selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        { borderColor: theme.border },
        pressed && styles.pressed,
      ]}>
      <Icon {...icon} size={16} />
      <ThemedText type="small" numberOfLines={1} style={styles.actionLabel}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const theme = useTheme();

  return (
    <View style={[styles.section, { borderTopColor: theme.border }]}>
      <ThemedText type="smallBold" style={styles.sectionTitle} accessibilityRole="header">
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

/** Short message for actions that are not built yet. */
function Notice({ message }: { message: string }) {
  const theme = useTheme();

  return (
    <View style={styles.noticeContainer} pointerEvents="none">
      <View
        style={[styles.notice, { backgroundColor: theme.primary }]}
        accessibilityLiveRegion="polite"
        accessibilityRole="alert">
        <ThemedText type="small" style={{ color: theme.onPrimary }}>
          {message}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    height: 180,
    borderRadius: Spacing.two,
  },
  titleBlock: {
    gap: Spacing.one,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 700,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.one,
    borderWidth: 1,
    borderRadius: Spacing.two,
  },
  actionLabel: {
    flexShrink: 1,
    fontSize: 13,
  },
  section: {
    gap: Spacing.two,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 16,
  },
  organizerRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  organizerImage: {
    width: 48,
    height: 40,
    borderRadius: Spacing.one,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guests: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.three,
  },
  guest: {
    width: 72,
    alignItems: 'center',
    gap: Spacing.one,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestName: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  noticeContainer: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    bottom: BottomTabInset + Spacing.three,
    alignItems: 'center',
  },
  notice: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignItems: 'center',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
