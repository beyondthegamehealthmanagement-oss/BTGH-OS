# BTGH OS

Mobile app for discovering community sports and health events, built with Expo (SDK 58), Expo Router, React Native, and TypeScript. Runs on iOS, Android, and web.

> **Sample data only.** There is no backend yet. All events are fictional and live in `src/data/sample-events.ts`; screens show a "Demo data" label. Saved events are kept in memory and reset when the app reloads.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the dev server

   ```bash
   npx expo start
   ```

3. Open the app:
   - **Phone:** install [Expo Go](https://expo.dev/go) and scan the QR code. Expo Go must support **SDK 58** (the current App Store / Play Store version does). If Expo Go reports a different SDK, update Expo Go.
   - **Web:** press `w` in the terminal, or open http://localhost:8081.
   - **Simulator/emulator:** press `i` (iOS, macOS only) or `a` (Android).

Before committing, run:

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```

Use `npx expo install <package>` (not `npm install <package>`) to add dependencies so versions match the SDK.

## Routes

Files in `src/app/` are screens ([Expo Router](https://docs.expo.dev/router/introduction)).

| Route | File | Screen |
| --- | --- | --- |
| `/` | `src/app/index.tsx` | Home: search, category shortcuts, hero, featured events |
| `/events` | `src/app/events/index.tsx` | Event listing: search, tabs, Nearby/Date/Event Type filters, save |
| `/events/[id]` | `src/app/events/[id].tsx` | Event details |
| `/discover`, `/impact`, `/profile` | `src/app/*.tsx` | "Coming soon" placeholders |

- `src/app/_layout.tsx` is the root layout. Tabs are defined in `src/components/app-tabs.tsx` (native tab bar) and `src/components/app-tabs.web.tsx` (web) — keep the two in sync.
- `src/app/events/_layout.tsx` is a stack inside the Events tab, so details open within the tab with back navigation.
- The Home search and category shortcuts open `/events` with `?q=` or `?tab=` set.

## Not built yet

Registration, add to calendar, notifications, profile, organizer/guest profiles, and the Athletes, Causes, and Organizations listings. Their buttons show a "coming soon" message or empty state. Event images are grey placeholders.

## Checking loading, empty, and error states

In development, add `?state=loading`, `?state=empty`, or `?state=error` to the Home or Events URL, e.g. http://localhost:8081/events?state=error. Unknown event IDs (e.g. `/events/not-real`) show "Event not found".

## Project layout

```
src/
  app/          routes (screens and layouts only)
  components/   shared UI (EventCard, AppHeader, Screen, SearchBar, Chip, FilterSelect, StatusView, …)
  constants/    theme colors and spacing (light and dark)
  data/         fictional sample events
  hooks/        useTheme, useSampleEvents, useSavedEvents
```
