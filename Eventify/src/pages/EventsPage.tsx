import { useEffect } from 'react';
import EventCard from '../components/common/EventCard';
import { useEventStore } from '../store/eventStore';

const EventsPage = () => {
  const { events, isLoading, error, fetchEvents } = useEventStore();
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          イベント一覧
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          あなたの興味に合ったイベントを見つけましょう。
        </p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p>読み込み中...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">イベントが見つかりませんでした</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage;