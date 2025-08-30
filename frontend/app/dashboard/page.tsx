'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { RoleGuard } from '../../components/RoleGuard';

export default function DashboardPage() {
  const router = useRouter();
  const { role } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome, {role}!</h1>
      <h2 className="text-2xl font-bold text-center mb-8">Welcome to the Dashboard!</h2>
      <div className="space-y-4">
        <RoleGuard allowedRoles={['Admin', 'Operator']}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Approve Alerts
          </button>
        </RoleGuard>
        <RoleGuard allowedRoles={['Admin']}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Manage Users
          </button>
        </RoleGuard>
        <RoleGuard allowedRoles={['Admin', 'Operator', 'Viewer']}>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            View Alerts
          </button>
        </RoleGuard>
      </div>
    </div>
  );
}
