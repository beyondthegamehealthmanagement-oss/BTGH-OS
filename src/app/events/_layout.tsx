import { Stack } from 'expo-router';

// Keeps the listing under a deep-linked details screen, so Back returns to Events.
export const unstable_settings = {
  initialRouteName: 'index',
};

// Stack inside the Events tab so event details open within the tab with back navigation.
export default function EventsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
