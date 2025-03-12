// src/pages/HomePage.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import EventCard from '../components/common/EventCard';
import { useEventStore } from '../store/eventStore';

const HomePage = () => {
  const { events, isLoading, error, fetchEvents } = useEventStore();
  
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヘッダーセクション */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          あなたの次の特別な体験を見つけよう
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          カンファレンス、コンサート、ワークショップなど、あなたの興味に合わせた多彩なイベントを簡単に検索・予約できます。
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/events">
            <Button size="lg">
              イベントを探す
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="lg">
              新規登録 / ログイン
            </Button>
          </Link>
        </div>
      </div>
      
      {/* イベントセクション */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">おすすめイベント</h2>
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            すべて見る →
          </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      
      {/* 特徴セクション */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">イベント予約の特徴</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            イベント検索から予約まで、スムーズなユーザー体験を提供します。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-indigo-500 text-white mb-4">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>検索アイコン</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">簡単検索</h3>
            <p className="text-gray-600">
              カテゴリー、日程、価格帯などで絞り込み、あなたにぴったりのイベントを見つけられます。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-indigo-500 text-white mb-4">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>決済アイコン</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">シームレスな決済</h3>
            <p className="text-gray-600">
              安全で快適なオンライン決済システムで、スムーズに予約が完了します。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-12 w-12 flex items-center justify-center rounded-md bg-indigo-500 text-white mb-4">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>ユーザーアイコン</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">パーソナライズされた体験</h3>
            <p className="text-gray-600">
              あなたの興味に合わせたイベント推薦や、過去の履歴に基づくおすすめ情報を提供します。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;