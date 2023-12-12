import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Route';
import AuthProvider from './providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <HelmetProvider>

          <RouterProvider router={router} />
        </HelmetProvider>
        <MessengerCustomerChat
          pageId="194790160378936"
          appId="143791218624400" />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
