// src/utils/formatters.ts
/**
 * 日付をフォーマットする関数
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  /**
   * 価格をフォーマットする関数
   */
  export const formatPrice = (price: number, currency: string = 'JPY'): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0
    }).format(price);
  };