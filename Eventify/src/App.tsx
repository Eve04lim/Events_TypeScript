// src/App.tsx
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                イベント予約
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                ホーム
              </Link>
              <Link
                to="/events"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                イベント
              </Link>
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md"
              >
                ログイン
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="*" element={<div>ページが見つかりません</div>} />
        </Routes>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <span className="text-xl font-bold">イベント予約</span>
              <p className="mt-2 text-gray-400">
                あなたの次の特別な体験を見つけましょう
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  会社情報
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-gray-300 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-300 hover:text-white">
                      お問い合わせ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  リーガル
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-gray-300 hover:text-white">
                      プライバシーポリシー
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-300 hover:text-white">
                      利用規約
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} イベント予約. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;