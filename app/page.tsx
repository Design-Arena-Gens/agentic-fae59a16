'use client';

import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import TicketManagement from '@/components/TicketManagement';
import VulnerabilityMonitor from '@/components/VulnerabilityMonitor';
import EndpointHealth from '@/components/EndpointHealth';
import AISupport from '@/components/AISupport';
import UserManagement from '@/components/UserManagement';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tickets', label: 'Ticket Management', icon: '🎫' },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: '🛡️' },
    { id: 'endpoints', label: 'Endpoint Health', icon: '💻' },
    { id: 'ai-support', label: 'AI Support', icon: '🤖' },
    { id: 'users', label: 'User Management', icon: '👥' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tickets':
        return <TicketManagement />;
      case 'vulnerabilities':
        return <VulnerabilityMonitor />;
      case 'endpoints':
        return <EndpointHealth />;
      case 'ai-support':
        return <AISupport />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">IT Ops Assistant</h1>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
