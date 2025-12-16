import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ShowcasePage } from './pages/ShowcasePage'
import { EventsPage } from './pages/EventsPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { DetailPage } from './pages/DetailPage'
import { EditPage } from './pages/EditPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginCallback } from './pages/LoginCallback'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ShowcasePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/project/:id" element={<DetailPage />} />
            <Route path="/project/:id/edit" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
            <Route path="/portfolio/:id" element={<DetailPage />} />
            <Route path="/portfolio/:id/edit" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
            <Route path="/auth/callback" element={<LoginCallback />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
