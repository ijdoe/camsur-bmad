import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Icon, type IconName } from './ui/Icon';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
  badge?: number;
}

interface User {
  name: string;
  role: string;
  avatar?: string;
}

interface LGU {
  id: string;
  name: string;
}

interface MainNavigationSidebarProps {
  currentPath: string;
  user: User;
  lgu: LGU;
  lguOptions: LGU[];
  onNavigate: (path: string) => void;
  onLGUChange: (lguId: string) => void;
  onLogout: () => void;
  className?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'ChartBarIcon', href: '/dashboard' },
  { id: 'insights', label: 'Insights', icon: 'EyeIcon', href: '/insights' },
  { id: 'community', label: 'Community Intelligence', icon: 'UserIcon', href: '/community' },
  { id: 'sensors', label: 'Sensors', icon: 'CogIcon', href: '/sensors' },
  { id: 'cctv', label: 'CCTV', icon: 'EyeIcon', href: '/cctv' },
  { id: 'users', label: 'Users', icon: 'UserIcon', href: '/users' },
  { id: 'lgus', label: 'LGUs', icon: 'MapIcon', href: '/lgus' },
  { id: 'settings', label: 'Settings', icon: 'CogIcon', href: '/settings' },
];

const MainNavigationSidebar: React.FC<MainNavigationSidebarProps> = ({
  currentPath,
  user,
  lgu,
  lguOptions,
  onNavigate,
  onLGUChange,
  onLogout,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header with Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-gray-900">LINGKOD</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={isCollapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'} size="sm" />
        </Button>
      </div>

      {/* LGU Selector */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <label htmlFor="lgu-select" className="block text-xs font-medium text-gray-700 mb-2">
            LGU
          </label>
          <select
            id="lgu-select"
            value={lgu.id}
            onChange={(e) => onLGUChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {lguOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isCollapsed ? 'px-2' : 'px-3',
                isActive && 'bg-blue-50 text-blue-700 border-blue-200'
              )}
              onClick={() => onNavigate(item.href)}
            >
              <Icon name={item.icon} size="sm" className="mr-3" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
                <Icon name="UserIcon" size="sm" className="text-gray-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              aria-label="Logout"
            >
              <Icon name="ArrowPathIcon" size="sm" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              aria-label="Logout"
            >
              <Icon name="ArrowPathIcon" size="sm" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { MainNavigationSidebar };
export type { NavigationItem, User, LGU };
