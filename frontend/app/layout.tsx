import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project LINGKOD Dashboard',
  description: 'Provincial Situational Awareness Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
              LINGKOD
            </div>
            <nav className="flex-1 p-4">
              <ul>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Dashboard
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Alerts
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Sensors
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    CCTV
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Users
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    LGUs
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
              <h1 className="text-xl font-semibold">Dashboard Overview</h1>
              <div className="flex items-center space-x-4">
                {/* User Profile / Notifications */}
                <span>Welcome, Operator!</span>
                {/* TODO: Add LGU Selector */}
              </div>
            </header>

            {/* Page Content */}
            <div className="flex-1 overflow-auto p-4">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
