'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MainNavigationSidebar } from './MainNavigationSidebar';
import { useAuth } from '@/hooks/useAuth';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Don't render layout for login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Dummy data for sidebar - replace with real data
  const lgu = { id: '1', name: 'Camarines Sur' };
  const lguOptions = [{ id: '1', name: 'Camarines Sur' }];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {user && (
        <MainNavigationSidebar
          currentPath={pathname}
          user={{ name: user.email, role: user.role }}
          lgu={lgu}
          lguOptions={lguOptions}
          onNavigate={(path) => {
            // In a real app, you'd use Next.js router here
            console.log(`Navigating to ${path}`);
          }}
          onLGUChange={(id) => console.log(`LGU changed to ${id}`)}
          onLogout={logout}
        />
      )}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
