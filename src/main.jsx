import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routs/Routs.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { CartProvider } from './Provider/CartProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <AuthProvider>
        <CartProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
        </CartProvider>
      </AuthProvider>
    
  </StrictMode>,
)
