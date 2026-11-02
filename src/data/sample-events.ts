/**
 * Fictional demo events. Not real BTGH events — replace with backend data later.
 */

export const eventTypes = ['Community Run', 'Workshop', 'Charity Event', 'Clinic'] as const;

export type EventType = (typeof eventTypes)[number];

export type SampleEvent = {
  id: string;
  title: string;
  type: EventType;
  /** ISO 8601 start time, local to the event */
  startsAt: string;
  location: string;
  /** Fictional distance from the viewer, used by the Nearby filter */
  distanceMiles: number;
  description: string;
  about: string;
  organizer: string;
  guests: string[];
  featured: boolean;
};

export const sampleEvents: SampleEvent[] = [
  {
    id: 'riverside-5k',
    title: 'Riverside Community 5K',
    type: 'Community Run',
    startsAt: '2026-11-14T08:00:00',
    location: 'Riverside Park',
    distanceMiles: 2,
    description: 'A friendly 5K for all paces, with a family walk route.',
    about:
      'Run, jog, or walk a flat riverside loop with neighbors of every age. Water stations, a cool-down stretch, and a kids’ dash at the finish. Entry fees support free youth running clubs.',
    organizer: 'Riverside Runners Club',
    guests: ['Maya Chen', 'Jordan Ellis', 'Sam Ortiz'],
    featured: true,
  },
  {
    id: 'youth-coaching-basics',
    title: 'Youth Coaching Basics',
    type: 'Workshop',
    startsAt: '2026-11-18T18:30:00',
    location: 'Eastside Community Center',
    distanceMiles: 6,
    description: 'An evening workshop for new volunteer coaches.',
    about:
      'Learn practical drills, positive communication, and safety basics for coaching kids ages 6–14. Includes a hands-on practice session and take-home session plans.',
    organizer: 'Eastside Youth Sports',
    guests: ['Coach Riley Park', 'Dana Brooks'],
    featured: true,
  },
  {
    id: 'hoops-for-hope',
    title: 'Hoops for Hope',
    type: 'Charity Event',
    startsAt: '2026-11-22T13:00:00',
    location: 'Lincoln High School Gym',
    distanceMiles: 4,
    description: 'A 3-on-3 tournament raising funds for local youth sports.',
    about:
      'Form a team or come cheer. Every bracket win unlocks a donation toward new equipment for neighborhood courts. Food trucks and a skills contest between games.',
    organizer: 'Hoops for Hope Collective',
    guests: ['Taylor Reed', 'Chris Alvarez', 'Morgan Lee'],
    featured: true,
  },
  {
    id: 'healthy-habits-clinic',
    title: 'Healthy Habits Clinic',
    type: 'Clinic',
    startsAt: '2026-12-02T10:00:00',
    location: 'Northgate Library',
    distanceMiles: 12,
    description: 'Free sessions on nutrition, sleep, and staying active.',
    about:
      'Short, practical sessions with local health volunteers on everyday nutrition, better sleep, and simple ways to move more. Drop in for one session or stay for all three.',
    organizer: 'Northgate Wellness Network',
    guests: ['Dr. Avery Kim'],
    featured: false,
  },
  {
    id: 'winter-fun-run',
    title: 'Winter Fun Run',
    type: 'Community Run',
    startsAt: '2026-12-12T09:00:00',
    location: 'Harbor Trail',
    distanceMiles: 18,
    description: 'A festive 3K loop. Costumes encouraged.',
    about:
      'A relaxed 3K along the harbor with hot cocoa at the finish. Prizes for the best costumes. Strollers and leashed dogs welcome.',
    organizer: 'Harbor Trail Friends',
    guests: ['Jamie Fox', 'Pat Rivera'],
    featured: false,
  },
];

export function getSampleEvent(id: string): SampleEvent | undefined {
  return sampleEvents.find((event) => event.id === id);
}

export function formatEventDate(startsAt: string) {
  return new Date(startsAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatEventTime(startsAt: string) {
  return new Date(startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
