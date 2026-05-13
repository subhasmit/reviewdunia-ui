import { Link, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { toggleAdminMode } from './features/ui/uiSlice'

function App() {
  const dispatch = useAppDispatch()
  const adminMode = useAppSelector((state) => state.ui.adminMode)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <h1>ReviewDunia</h1>
          <p className="tagline">Smart product reviews with screenshot matching.</p>
        </div>
        <nav aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/products/demo-product">Product</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <button
          type="button"
          className="secondary-button"
          onClick={() => dispatch(toggleAdminMode())}
          aria-pressed={adminMode}
        >
          Admin Mode: {adminMode ? 'On' : 'Off'}
        </button>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
