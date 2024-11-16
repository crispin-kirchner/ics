export type DateTime = DateArray | number | string;

export type DateArray =
  | [number, number, number, number, number]
  | [number, number, number, number]
  | [number, number, number];

export type DurationObject = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  before?: boolean;
};

export type GeoCoordinates = {
  lat: number;
  lon: number;
};

export type EventStatus = 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED';

export type ParticipationStatus =
  | 'NEEDS-ACTION'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'TENTATIVE'
  | 'DELEGATED'
  | 'COMPLETED'
  | 'IN-PROCESS';

export type ParticipationRole =
  | 'CHAIR'
  | 'REQ-PARTICIPANT'
  | 'OPT-PARTICIPANT'
  | 'NON-PARTICIPANT';

export type ParticipationType =
  | 'INDIVIDUAL'
  | 'GROUP'
  | 'RESOURCE'
  | 'ROOM'
  | 'UNKNOWN';

export type Person = {
  name?: string;
  email?: string;
  dir?: string;
};

export type Attendee = Person & {
  rsvp?: boolean;
  partstat?: ParticipationStatus;
  role?: ParticipationRole;
  cutype?: ParticipationType;
  xNumGuests?: number;
};

export type ActionType = 'audio' | 'display' | 'email' | 'procedure';

/**
 * This property defines the access classification for a calendar component.
 */
export type classificationType = 'PUBLIC' | 'PRIVATE' | 'CONFIDENTIAL' | string;

export type Alarm = {
  action?: ActionType;
  description?: string;
  summary?: string;
  duration?: DurationObject;
  trigger?: DurationObject | DateTime;
  repeat?: number;
  attachType?: string;
  attach?: string;
};

export type HeaderAttributes = {
  productId?: string;
  method?: string;
  calName?: string;
  timezones?: string;
}

export type EventAttributes = {
  start: DateTime;
  startInputType?: 'local' | 'utc';
  startOutputType?: 'local' | 'utc';
  startTimezone?: string

  endInputType?: 'local' | 'utc';
  endOutputType?: 'local' | 'utc';
  endTimezone?: string,

  title?: string;
  description?: string;

  location?: string;
  geo?: GeoCoordinates;

  url?: string;
  status?: EventStatus;
  busyStatus?: 'FREE' | 'BUSY' | 'TENTATIVE' | 'OOF';
  transp?: 'TRANSPARENT' | 'OPAQUE';

  organizer?: Person & {
    sentBy?: string;
  };
  attendees?: Attendee[];

  categories?: string[];
  alarms?: Alarm[];

  productId?: HeaderAttributes['productId'];
  uid?: string;
  method?: HeaderAttributes['method'];
  recurrenceRule?: string;
  exclusionDates?: DateTime[];
  exclusionDatesTimezone?: string;
  sequence?: number;
  calName?: HeaderAttributes['calName'];
  classification?: classificationType;
  created?: DateTime;
  lastModified?: DateTime;
  htmlContent?: string;
} & ({ end: DateTime } | { duration: DurationObject });

export type ReturnObject = { error?: Error; value?: string };

type NodeCallback = (error: Error | undefined, value: string) => void;

export function createEvent(attributes: EventAttributes, callback: NodeCallback): void;

export function createEvent(attributes: EventAttributes): ReturnObject;

export function createEvents(events: EventAttributes[], callback: NodeCallback): void;
export function createEvents(events: EventAttributes[], headerAttributes?: HeaderAttributes): ReturnObject;
export function createEvents(events: EventAttributes[], headerAttributes: HeaderAttributes, callback: NodeCallback): void;

export function convertTimestampToArray(timestamp: Number, inputType: String): DateArray;
