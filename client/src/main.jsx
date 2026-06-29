import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRoutes} />
    </QueryClientProvider>
  </AuthProvider>
  </StrictMode>,
)
