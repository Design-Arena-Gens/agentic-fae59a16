'use client';

import { useState } from 'react';
import { Laptop, Smartphone, Monitor, Server, Search } from 'lucide-react';

const EndpointHealth = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');

  const endpoints = [
    {
      id: 'WS-001',
      name: 'John-MacBook-Pro',
      type: 'Laptop',
      os: 'macOS 14.2',
      status: 'Healthy',
      lastSeen: '2 min ago',
      cpu: 45,
      memory: 62,
      disk: 78,
      user: 'john.doe@company.com',
    },
    {
      id: 'WS-002',
      name: 'Sarah-Windows-Desktop',
      type: 'Desktop',
      os: 'Windows 11 Pro',
      status: 'Healthy',
      lastSeen: '5 min ago',
      cpu: 28,
      memory: 51,
      disk: 65,
      user: 'sarah.johnson@company.com',
    },
    {
      id: 'WS-003',
      name: 'Mike-iPhone-14',
      type: 'Mobile',
      os: 'iOS 17.2',
      status: 'Healthy',
      lastSeen: '1 min ago',
      cpu: 15,
      memory: 42,
      disk: 88,
      user: 'mike.davis@company.com',
    },
    {
      id: 'WS-004',
      name: 'Emily-Surface-Laptop',
      type: 'Laptop',
      os: 'Windows 11 Pro',
      status: 'Warning',
      lastSeen: '3 min ago',
      cpu: 82,
      memory: 91,
      disk: 95,
      user: 'emily.chen@company.com',
    },
    {
      id: 'WS-005',
      name: 'Alex-MacBook-Air',
      type: 'Laptop',
      os: 'macOS 14.1',
      status: 'Critical',
      lastSeen: '45 min ago',
      cpu: 98,
      memory: 96,
      disk: 99,
      user: 'alex.wong@company.com',
    },
    {
      id: 'WS-006',
      name: 'Server-DC-01',
      type: 'Server',
      os: 'Windows Server 2022',
      status: 'Healthy',
      lastSeen: '1 min ago',
      cpu: 35,
      memory: 58,
      disk: 72,
      user: 'System',
    },
    {
      id: 'WS-007',
      name: 'Lisa-iPad-Pro',
      type: 'Mobile',
      os: 'iPadOS 17.2',
      status: 'Offline',
      lastSeen: '2 hours ago',
      cpu: 0,
      memory: 0,
      disk: 0,
      user: 'lisa.martinez@company.com',
    },
    {
      id: 'WS-008',
      name: 'David-ThinkPad',
      type: 'Laptop',
      os: 'Windows 11 Pro',
      status: 'Healthy',
      lastSeen: '4 min ago',
      cpu: 52,
      memory: 68,
      disk: 81,
      user: 'david.kim@company.com',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Offline':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Laptop':
        return Laptop;
      case 'Desktop':
        return Monitor;
      case 'Mobile':
        return Smartphone;
      case 'Server':
        return Server;
      default:
        return Monitor;
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-red-600';
    if (value >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesSearch =
      endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDevice = deviceFilter === 'all' || endpoint.type === deviceFilter;
    return matchesSearch && matchesDevice;
  });

  const healthyCount = endpoints.filter((e) => e.status === 'Healthy').length;
  const warningCount = endpoints.filter((e) => e.status === 'Warning').length;
  const criticalCount = endpoints.filter((e) => e.status === 'Critical').length;
  const offlineCount = endpoints.filter((e) => e.status === 'Offline').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Endpoint Health</h2>
        <p className="text-gray-600 mt-1">Monitor all endpoints across Windows, macOS, and mobile devices</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div>
            <p className="text-sm text-gray-600 font-medium">Healthy</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{healthyCount}</p>
            <p className="text-sm text-gray-500 mt-1">{Math.round((healthyCount / endpoints.length) * 100)}% of total</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div>
            <p className="text-sm text-gray-600 font-medium">Warning</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{warningCount}</p>
            <p className="text-sm text-gray-500 mt-1">{Math.round((warningCount / endpoints.length) * 100)}% of total</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div>
            <p className="text-sm text-gray-600 font-medium">Critical</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{criticalCount}</p>
            <p className="text-sm text-gray-500 mt-1">{Math.round((criticalCount / endpoints.length) * 100)}% of total</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-500">
          <div>
            <p className="text-sm text-gray-600 font-medium">Offline</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{offlineCount}</p>
            <p className="text-sm text-gray-500 mt-1">{Math.round((offlineCount / endpoints.length) * 100)}% of total</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Devices</option>
            <option value="Laptop">Laptops</option>
            <option value="Desktop">Desktops</option>
            <option value="Mobile">Mobile Devices</option>
            <option value="Server">Servers</option>
          </select>
        </div>
      </div>

      {/* Endpoints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEndpoints.map((endpoint) => {
          const DeviceIcon = getDeviceIcon(endpoint.type);
          return (
            <div key={endpoint.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <DeviceIcon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{endpoint.name}</h3>
                    <p className="text-sm text-gray-500">{endpoint.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(endpoint.status)}`}>
                  {endpoint.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">OS</span>
                  <span className="font-medium text-gray-900">{endpoint.os}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">User</span>
                  <span className="font-medium text-gray-900 truncate ml-2" title={endpoint.user}>
                    {endpoint.user}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Seen</span>
                  <span className="font-medium text-gray-900">{endpoint.lastSeen}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU</span>
                        <span className={`font-semibold ${getMetricColor(endpoint.cpu)}`}>{endpoint.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            endpoint.cpu >= 90
                              ? 'bg-red-600'
                              : endpoint.cpu >= 75
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${endpoint.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Memory</span>
                        <span className={`font-semibold ${getMetricColor(endpoint.memory)}`}>{endpoint.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            endpoint.memory >= 90
                              ? 'bg-red-600'
                              : endpoint.memory >= 75
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${endpoint.memory}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Disk</span>
                        <span className={`font-semibold ${getMetricColor(endpoint.disk)}`}>{endpoint.disk}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            endpoint.disk >= 90
                              ? 'bg-red-600'
                              : endpoint.disk >= 75
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${endpoint.disk}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EndpointHealth;
