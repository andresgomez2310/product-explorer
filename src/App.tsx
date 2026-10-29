
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/products/:id"
            element={<ProductDetailPage />}
          />
          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
