// src/pages/EventDetailPage.tsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { useEventStore } from '../store/eventStore';
import { formatDate, formatPrice } from '../utils/formatters';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedEvent, isLoading, error, fetchEventById } = useEventStore();
  
  useEffect(() => {
    if (id) {
      fetchEventById(id);
    }
  }, [id, fetchEventById]);
  
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
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
          <div className="mt-4">
            <Button
              onClick={() => navigate('/events')}
              variant="outline"
            >
              イベント一覧に戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!selectedEvent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p className="text-gray-500">イベントが見つかりませんでした</p>
          <div className="mt-4">
            <Button
              onClick={() => navigate('/events')}
              variant="outline"
            >
              イベント一覧に戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // 残席率
  const remainingSeatsPercentage = (selectedEvent.availableSeats / selectedEvent.totalSeats) * 100;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* イベントヘッダー */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="relative h-64 bg-gray-200">
          {selectedEvent.imageUrl ? (
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
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
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedEvent.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
              {categoryLabels[selectedEvent.category]}
            </span>
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
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
              {formatDate(selectedEvent.startDate)}
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
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
              {selectedEvent.venue.name}
            </div>
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>価格</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {formatPrice(selectedEvent.price)}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">イベント概要</h2>
            <p className="text-gray-700">{selectedEvent.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">会場情報</h2>
            <p className="text-gray-700">
              {selectedEvent.venue.name}<br />
              {selectedEvent.venue.address}, {selectedEvent.venue.city}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">主催者</h2>
            <p className="text-gray-700">{selectedEvent.organizer}</p>
          </div>
          
          {/* 残席状況 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">残席状況</h2>
            <div className="flex justify-between text-sm mb-1">
              <span>残席</span>
              <span className="font-medium">
                {selectedEvent.availableSeats} / {selectedEvent.totalSeats}席
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
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
          
          <div className="flex justify-between">
            <Button
              onClick={() => navigate('/events')}
              variant="outline"
            >
              イベント一覧に戻る
            </Button>
            
            <Button
              onClick={() => navigate(`/booking/${selectedEvent.id}`)}
              disabled={selectedEvent.availableSeats === 0}
            >
              {selectedEvent.availableSeats > 0 ? '予約する' : '売り切れ'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;