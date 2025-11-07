'use client';

import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const stats = [
    { label: 'Open Tickets', value: '47', change: '+12%', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Critical Vulnerabilities', value: '8', change: '-3', icon: AlertCircle, color: 'bg-red-500' },
    { label: 'Healthy Endpoints', value: '342/380', change: '90%', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Avg Resolution Time', value: '2.4h', change: '-18%', icon: TrendingUp, color: 'bg-blue-500' },
  ];

  const ticketData = [
    { name: 'Mon', tickets: 24 },
    { name: 'Tue', tickets: 32 },
    { name: 'Wed', tickets: 28 },
    { name: 'Thu', tickets: 41 },
    { name: 'Fri', tickets: 35 },
    { name: 'Sat', tickets: 15 },
    { name: 'Sun', tickets: 12 },
  ];

  const vulnerabilityTrend = [
    { name: 'Week 1', critical: 12, high: 28, medium: 45 },
    { name: 'Week 2', critical: 10, high: 25, medium: 42 },
    { name: 'Week 3', critical: 9, high: 23, medium: 38 },
    { name: 'Week 4', critical: 8, high: 20, medium: 35 },
  ];

  const recentActivity = [
    { id: 1, type: 'ticket', message: 'Ticket #1245 resolved - Password reset for John Doe', time: '5 min ago', status: 'success' },
    { id: 2, type: 'vulnerability', message: 'Critical vulnerability detected - CVE-2024-1234', time: '12 min ago', status: 'critical' },
    { id: 3, type: 'endpoint', message: 'Endpoint WS-342 went offline', time: '23 min ago', status: 'warning' },
    { id: 4, type: 'user', message: 'New user onboarded - Sarah Johnson', time: '1 hour ago', status: 'info' },
    { id: 5, type: 'ticket', message: 'Ticket #1243 escalated to L2 support', time: '2 hours ago', status: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Real-time monitoring of your IT operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Ticket Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vulnerability Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={vulnerabilityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : activity.status === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : activity.status === 'warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
