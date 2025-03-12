export type SeatStatus = 'available' | 'reserved' | 'sold' | 'selected' | 'unavailable';
// 利用可能、予約済み、販売済み、選択中、利用不可

export interface SeatCategory {
  id: string;
  name: string;   // カテゴリー名
  price: number;  // 価格
  color: string;  // カラー
}

export interface Seat {
  id: string;
  row: string;     // 列
  number: number;  // 番号
  status: SeatStatus;
  categoryId: string;
}

export interface SeatMap {
  id: string;
  eventId: string;
  rows: number;     // 行数
  columns: number;  // 列数
  sections: {       // セクション情報
    id: string;
    name: string;
    rows: string[];
    seats: Seat[];
  }[];
  categories: SeatCategory[];
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  seats: {
    id: string;
    price: number;
  }[];
  totalAmount: number;    // 合計金額
  currency: string;       // 通貨
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded'; // 状態
  paymentId?: string;     // 支払いID
  createdAt: string;
  updatedAt: string;
}

export interface BookingState {
  selectedSeats: Seat[];
  seatMap: SeatMap | null;
  booking: Booking | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  step: 'selection' | 'checkout' | 'confirmation'; // 予約ステップ
}

// src/types/review.types.ts
export interface Review {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;     // 評価（星の数など）
  content: string;    // レビュー内容
  createdAt: string;
  updatedAt: string;
}