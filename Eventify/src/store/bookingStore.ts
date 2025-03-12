import { create } from 'zustand';
import type { Booking, BookingState, Seat, SeatMap } from '../types/booking.types';

interface BookingActions {
  fetchSeatMap: (eventId: string) => Promise<void>;
  selectSeat: (seat: Seat) => void;
  deselectSeat: (seatId: string) => void;
  clearSelectedSeats: () => void;
  createBooking: () => Promise<void>;
  fetchUserBookings: (userId: string) => Promise<void>;
  setBookingStep: (step: BookingState['step']) => void;
  clearError: () => void;
}

const initialState: BookingState = {
  selectedSeats: [],
  seatMap: null,
  booking: null,
  bookings: [],
  isLoading: false,
  error: null,
  step: 'selection',
};

export const useBookingStore = create<BookingState & BookingActions>((set, get) => ({
  ...initialState,
  fetchSeatMap: async (eventId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Supabase/FirebaseでのAPIコールを実装
      // 現在はモックデータを返す
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 簡単なモック座席マップを生成
      const mockSeatMap: SeatMap = {
        id: '1',
        eventId,
        rows: 10,
        columns: 15,
        sections: [
          {
            id: 'section-1',
            name: 'メインフロア',
            rows: ['A', 'B', 'C', 'D', 'E'],
            seats: Array.from({ length: 75 }, (_, i) => {
              const row = String.fromCharCode(65 + Math.floor(i / 15));
              const number = (i % 15) + 1;
              // ランダムに一部の席を売り切れまたは予約済みに設定
              const randomStatus = Math.random();
              let status: 'available' | 'reserved' | 'sold' = 'available';
              if (randomStatus > 0.7) status = 'sold';
              else if (randomStatus > 0.6) status = 'reserved';
              
              return {
                id: `${row}-${number}`,
                row,
                number,
                status,
                categoryId: row < 'C' ? 'vip' : 'standard',
              };
            }),
          },
          {
            id: 'section-2',
            name: 'バルコニー',
            rows: ['F', 'G', 'H', 'I', 'J'],
            seats: Array.from({ length: 75 }, (_, i) => {
              const row = String.fromCharCode(70 + Math.floor(i / 15));
              const number = (i % 15) + 1;
              // ランダムに一部の席を売り切れまたは予約済みに設定
              const randomStatus = Math.random();
              let status: 'available' | 'reserved' | 'sold' = 'available';
              if (randomStatus > 0.7) status = 'sold';
              else if (randomStatus > 0.6) status = 'reserved';
              
              return {
                id: `${row}-${number}`,
                row,
                number,
                status,
                categoryId: 'standard',
              };
            }),
          },
        ],
        categories: [
          {
            id: 'vip',
            name: 'VIP',
            price: 15000,
            color: '#FFD700',
          },
          {
            id: 'standard',
            name: '標準席',
            price: 7500,
            color: '#87CEEB',
          },
        ],
      };
      
      set({ 
        seatMap: mockSeatMap, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '座席マップの取得に失敗しました', 
        isLoading: false 
      });
    }
  },
  selectSeat: (seat) => {
    if (seat.status !== 'available') return;
    
    // 既に選択されている席かチェック
    const { selectedSeats } = get();
    if (selectedSeats.some(s => s.id === seat.id)) return;
    
    // 席を選択に追加
    const updatedSeat = { ...seat, status: 'selected' as const };
    set({ selectedSeats: [...selectedSeats, updatedSeat] });
    
    // 座席マップの席ステータスを更新
    const { seatMap } = get();
    if (seatMap) {
      const updatedSeatMap = { ...seatMap };
      updatedSeatMap.sections = updatedSeatMap.sections.map(section => {
        section.seats = section.seats.map(s => 
          s.id === seat.id ? updatedSeat : s
        );
        return section;
      });
      set({ seatMap: updatedSeatMap });
    }
  },
  deselectSeat: (seatId) => {
    const { selectedSeats, seatMap } = get();
    const seatToRemove = selectedSeats.find(s => s.id === seatId);
    if (!seatToRemove) return;
    
    // 選択から席を削除
    set({ selectedSeats: selectedSeats.filter(s => s.id !== seatId) });
    
    // 座席マップの席ステータスを更新
    if (seatMap) {
      const updatedSeatMap = { ...seatMap };
      updatedSeatMap.sections = updatedSeatMap.sections.map(section => {
        section.seats = section.seats.map(s => 
          s.id === seatId ? { ...s, status: 'available' as const } : s
        );
        return section;
      });
      set({ seatMap: updatedSeatMap });
    }
  },
  clearSelectedSeats: () => {
    const { selectedSeats, seatMap } = get();
    
    if (selectedSeats.length === 0) return;
    
    // 選択された全ての席をavailableに戻す
    if (seatMap) {
      const updatedSeatMap = { ...seatMap };
      updatedSeatMap.sections = updatedSeatMap.sections.map(section => {
        section.seats = section.seats.map(s => 
          selectedSeats.some(selected => selected.id === s.id)
            ? { ...s, status: 'available' as const }
            : s
        );
        return section;
      });
      set({ seatMap: updatedSeatMap, selectedSeats: [] });
    } else {
      set({ selectedSeats: [] });
    }
  },
  createBooking: async () => {
    const { selectedSeats, seatMap } = get();
    if (selectedSeats.length === 0) {
      set({ error: '席が選択されていません' });
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      // TODO: Supabase/FirebaseでのAPIコールを実装
      // 現在はモック予約を作成
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 合計金額を計算
      let totalAmount = 0;
      const seatCategories = seatMap?.categories || [];
      const seatsWithPrices = selectedSeats.map(seat => {
        const category = seatCategories.find(c => c.id === seat.categoryId);
        const price = category?.price || 0;
        totalAmount += price;
        return { id: seat.id, price };
      });
      
      const mockBooking: Booking = {
        id: `booking-${Date.now()}`,
        eventId: seatMap?.eventId || '',
        userId: '1', // 認証実装時には実際のユーザーIDを使用
        seats: seatsWithPrices,
        totalAmount,
        currency: 'JPY',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set({ 
        booking: mockBooking, 
        isLoading: false,
        step: 'checkout'
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '予約の作成に失敗しました', 
        isLoading: false 
      });
    }
  },
  fetchUserBookings: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Supabase/FirebaseでのAPIコールを実装
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockBookings: Booking[] = [
        {
          id: 'booking-1',
          eventId: '1',
          userId,
          seats: [
            { id: 'A-5', price: 15000 },
            { id: 'A-6', price: 15000 },
          ],
          totalAmount: 30000,
          currency: 'JPY',
          status: 'confirmed',
          paymentId: 'pay_123456',
          createdAt: '2024-05-15T10:30:00Z',
          updatedAt: '2024-05-15T10:35:00Z',
        },
        {
          id: 'booking-2',
          eventId: '3',
          userId,
          seats: [
            { id: 'C-10', price: 7500 },
          ],
          totalAmount: 7500,
          currency: 'JPY',
          status: 'confirmed',
          paymentId: 'pay_654321',
          createdAt: '2024-04-20T14:15:00Z',
          updatedAt: '2024-04-20T14:20:00Z',
        },
      ];
      
      set({ bookings: mockBookings, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '予約履歴の取得に失敗しました', 
        isLoading: false 
      });
    }
  },
  setBookingStep: (step) => set({ step }),
  clearError: () => set({ error: null }),
}));