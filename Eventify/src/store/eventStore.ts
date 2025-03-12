import { create } from 'zustand';
import type { Event, EventsState } from '../types/event.types';

interface EventActions {
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
}

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
  isLoading: false,
  error: null,
};

export const useEventStore = create<EventsState & EventActions>((set) => ({
  ...initialState,
  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      // モックデータ - 後でAPIに置き換え
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'テクノロジーカンファレンス2025',
          description: '業界トップのスピーカーによるカンファレンス',
          organizer: 'テックイベント株式会社',
          venue: {
            id: '201',
            name: 'コンベンションセンター',
            address: '東京都千代田区1-1-1',
            city: '東京',
          },
          startDate: '2025-06-15T09:00:00Z',
          endDate: '2025-06-17T18:00:00Z',
          category: 'conference',
          imageUrl: 'https://example.com/images/tech-conf.jpg',
          price: 20000,
          availableSeats: 450,
          totalSeats: 1000,
        },
        {
          id: '2',
          title: '夏の音楽フェスティバル',
          description: '3日間の音楽イベント',
          organizer: 'フェスティバルプロダクションズ',
          venue: {
            id: '202',
            name: '市民公園',
            address: '大阪市中央区2-2-2',
            city: '大阪',
          },
          startDate: '2025-07-10T12:00:00Z',
          endDate: '2025-07-12T23:00:00Z',
          category: 'concert',
          imageUrl: 'https://example.com/images/music-fest.jpg',
          price: 15000,
          availableSeats: 2000,
          totalSeats: 5000,
        },
      ];
      
      // Wait to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ events: mockEvents, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'イベントの取得に失敗しました', 
        isLoading: false 
      });
    }
  },
  fetchEventById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // モックデータから検索
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // ここでは簡易実装としてstateから検索 (実際はAPIコール)
      const state = useEventStore.getState();
      const event = state.events.find(e => e.id === id);
      
      if (event) {
        set({ selectedEvent: event, isLoading: false });
      } else {
        throw new Error('イベントが見つかりません');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'イベント詳細の取得に失敗しました', 
        isLoading: false 
      });
    }
  },
}));