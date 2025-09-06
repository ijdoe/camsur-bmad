'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

interface Lgu {
  id: string;
  name: string;
  province: string;
  createdAt: string;
}

export const LguManagementPanel: React.FC = () => {
  const [lgus, setLgus] = useState<Lgu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLgus();
  }, []);

  const fetchLgus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lgus');
      if (!response.ok) {
        throw new Error('Failed to fetch LGUs');
      }
      const data = await response.json();
      setLgus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <Icon name="ArrowPathIcon" className="animate-spin mr-2" />
          <span>Loading LGUs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          LGU Management
        </h2>
        <Button variant="primary">
          <Icon name="PlusIcon" size="sm" className="mr-2" />
          Add LGU
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Province
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {lgus.map((lgu) => (
              <tr key={lgu.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {lgu.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                  {lgu.province}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                  {new Date(lgu.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button variant="tertiary" size="sm">
                      <Icon name="PencilIcon" size="sm" />
                    </Button>
                    <Button
                      variant="destructive-outline"
                      size="sm"
                    >
                      <Icon name="TrashIcon" size="sm" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lgus.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-slate-400">
          No LGUs found
        </div>
      )}
    </div>
  );
};
