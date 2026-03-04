import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { RealtimeProvider } from './contexts/RealtimeContext.tsx'
import { CategoriesProvider } from './contexts/CategoriesContext.tsx'
import { TagsProvider } from './contexts/TagsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RealtimeProvider>
        <CategoriesProvider>
          <TagsProvider>
            <App />
          </TagsProvider>
        </CategoriesProvider>
      </RealtimeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
