export type EventCategory = 
  | 'conference' 
  | 'concert' 
  | 'workshop' 
  | 'sports' 
  | 'theater' 
  | 'exhibition' 
  | 'other';

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  venue: Venue;
  startDate: string;
  endDate: string;
  category: EventCategory;
  imageUrl?: string;
  price: number;  // EventCardとEventDetailPageで使用
  availableSeats: number;
  totalSeats: number;
}

export interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}