import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { ShowcasePage } from './pages/ShowcasePage'
import { DetailPage } from './pages/DetailPage'
import { EditPage } from './pages/EditPage'
import { LoginCallback } from './pages/LoginCallback'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ShowcasePage />} />
            <Route path="/project/:id" element={<DetailPage />} />
            <Route path="/project/:id/edit" element={<EditPage />} />
            <Route path="/portfolio/:id" element={<DetailPage />} />
            <Route path="/portfolio/:id/edit" element={<EditPage />} />
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
