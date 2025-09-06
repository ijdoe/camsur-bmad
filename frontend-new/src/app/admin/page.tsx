'use client';

import { RoleGuard } from '@/components/RoleGuard';
import { UserManagementPanel } from '@/components/UserManagementPanel';
import { LguManagementPanel } from '@/components/LguManagementPanel';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={['Admin']}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Administrator Dashboard
        </h1>
        
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )}
                >
                  User Management
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )}
                >
                  LGU Management
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <UserManagementPanel />
            </Tab.Panel>
            <Tab.Panel>
              <LguManagementPanel />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </RoleGuard>
  );
}
