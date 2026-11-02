import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { sampleEvents, type SampleEvent } from '@/data/sample-events';

export type LoadStatus = 'loading' | 'ready' | 'error';

const SIMULATED_DELAY_MS = 400;

/**
 * Loads the demo events with a short fake delay so the loading state is visible.
 *
 * In development, add `?state=loading`, `?state=empty`, or `?state=error` to a
 * screen's URL to inspect those states.
 */
export function useSampleEvents() {
  const { state } = useLocalSearchParams<{ state?: string }>();
  const forcedState = __DEV__ ? state : undefined;

  const [status, setStatus] = useState<LoadStatus>('loading');
  const [events, setEvents] = useState<SampleEvent[]>([]);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (forcedState === 'loading') return;

    const timer = setTimeout(() => {
      if (forcedState === 'error') {
        setStatus('error');
        return;
      }
      setEvents(forcedState === 'empty' ? [] : sampleEvents);
      setStatus('ready');
    }, SIMULATED_DELAY_MS);

    return () => clearTimeout(timer);
  }, [forcedState, attempt]);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((value) => value + 1);
  }, []);

  return { status, events, retry };
}
