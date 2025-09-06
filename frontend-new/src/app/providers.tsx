'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'next-themes';
import { FilterProvider } from '@/lib/FilterContext';
import { AuthProvider } from '@/hooks/useAuth';
import { AppLayout } from '@/components/AppLayout';
import React from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <FilterProvider>
            <AppLayout>{children}</AppLayout>
          </FilterProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
