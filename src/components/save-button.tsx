import { IconButton } from './icon-button';

import { useSavedEvents } from '@/hooks/use-saved-events';

type SaveButtonProps = {
  eventId: string;
  eventTitle: string;
  size?: number;
};

/** Heart toggle for saving an event (in memory only). */
export function SaveButton({ eventId, eventTitle, size = 24 }: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedEvents();
  const saved = isSaved(eventId);

  return (
    <IconButton
      label={saved ? `Unsave ${eventTitle}` : `Save ${eventTitle}`}
      selected={saved}
      ios={saved ? 'heart.fill' : 'heart'}
      // Material Symbols has no filled variant here, so the saved state adds a check mark
      md={saved ? 'heart_check' : 'favorite'}
      size={size}
      onPress={() => toggleSaved(eventId)}
    />
  );
}
