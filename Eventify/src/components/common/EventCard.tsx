// src/components/common/EventCard.tsx
import { Link } from 'react-router-dom';
import type { Event } from '../../types/event.types';
import { formatDate, formatPrice } from '../../utils/formatters';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  // 各カテゴリーに適した色を設定
  const categoryColors = {
    conference: 'bg-blue-100 text-blue-800',
    concert: 'bg-purple-100 text-purple-800',
    workshop: 'bg-yellow-100 text-yellow-800',
    sports: 'bg-green-100 text-green-800',
    theater: 'bg-pink-100 text-pink-800',
    exhibition: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800',
  };

  // カテゴリー表示名
  const categoryLabels = {
    conference: 'カンファレンス',
    concert: 'コンサート',
    workshop: 'ワークショップ',
    sports: 'スポーツ',
    theater: '演劇',
    exhibition: '展示会',
    other: 'その他',
  };
  
  // 残席率
  const remainingSeatsPercentage = (event.availableSeats / event.totalSeats) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/events/${event.id}`}>
        <div className="relative h-48 bg-gray-200">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>イベント画像</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                categoryColors[event.category]
              }`}
            >
              {categoryLabels[event.category]}
            </span>
            <div className="text-sm font-medium text-gray-600">
              {formatPrice(event.price)}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {event.title}
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>開催日時</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>{formatDate(event.startDate)}</div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>会場</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>{event.venue.name}</div>
            </div>
          </div>
          
          {/* 残席状況 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>残席状況</span>
              <span className="font-medium">
                {event.availableSeats} / {event.totalSeats}席
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  remainingSeatsPercentage > 50
                    ? 'bg-green-500'
                    : remainingSeatsPercentage > 20
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${remainingSeatsPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;