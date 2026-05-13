import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import './App.css'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { toggleAdminMode } from './features/ui/uiSlice'

function App() {
  const dispatch = useAppDispatch()
  const adminMode = useAppSelector((state) => state.ui.adminMode)

  return (
    <Box className="app-shell">
      <AppBar position="static" color="inherit" elevation={0} className="site-header">
        <Toolbar className="site-toolbar">
          <Box className="site-title-group">
            <Typography variant="h4" component="h1">
              ReviewDunia
            </Typography>
            <Typography variant="body2" className="tagline">
              Smart product reviews with screenshot matching.
            </Typography>
          </Box>
          <Box component="nav" aria-label="Primary navigation" className="site-nav">
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/products/1" color="inherit">
              Product
            </Button>
            <Button component={RouterLink} to="/admin" color="inherit">
              Admin
            </Button>
            <Button
              type="button"
              variant={adminMode ? 'contained' : 'outlined'}
              onClick={() => dispatch(toggleAdminMode())}
              aria-pressed={adminMode}
            >
              Admin Mode: {adminMode ? 'On' : 'Off'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route
            path="*"
            element={
              <Typography variant="h6" className="not-found">
                Page not found.
              </Typography>
            }
          />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
