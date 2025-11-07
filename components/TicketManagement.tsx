'use client';

import { useState } from 'react';
import { Search, Filter, Plus, ExternalLink } from 'lucide-react';

const TicketManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const tickets = [
    {
      id: 'SNOW-1245',
      title: 'Password reset request',
      platform: 'ServiceNow',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'John Smith',
      created: '2024-01-15 09:30',
      sla: 'Met',
    },
    {
      id: 'JIRA-8901',
      title: 'VPN connection issues',
      platform: 'Jira',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Sarah Johnson',
      created: '2024-01-15 11:45',
      sla: 'At Risk',
    },
    {
      id: 'FRESH-4532',
      title: 'Printer not responding',
      platform: 'Freshservice',
      priority: 'Medium',
      status: 'Open',
      assignee: 'Mike Davis',
      created: '2024-01-15 13:20',
      sla: 'On Track',
    },
    {
      id: 'SNOW-1246',
      title: 'Software installation - Adobe Creative Suite',
      platform: 'ServiceNow',
      priority: 'Medium',
      status: 'Open',
      assignee: 'Emily Chen',
      created: '2024-01-15 14:10',
      sla: 'On Track',
    },
    {
      id: 'JIRA-8902',
      title: 'Email synchronization problem',
      platform: 'Jira',
      priority: 'High',
      status: 'Escalated',
      assignee: 'John Smith',
      created: '2024-01-15 15:30',
      sla: 'Breached',
    },
    {
      id: 'FRESH-4533',
      title: 'Access request - Shared drive',
      platform: 'Freshservice',
      priority: 'Low',
      status: 'Pending',
      assignee: 'Sarah Johnson',
      created: '2024-01-15 16:00',
      sla: 'On Track',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Open':
        return 'bg-gray-100 text-gray-800';
      case 'Escalated':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSLAColor = (sla: string) => {
    switch (sla) {
      case 'Met':
        return 'text-green-600';
      case 'On Track':
        return 'text-blue-600';
      case 'At Risk':
        return 'text-yellow-600';
      case 'Breached':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || ticket.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Ticket Management</h2>
          <p className="text-gray-600 mt-1">Unified view across ServiceNow, Jira, and Freshservice</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Create Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="text-gray-400 mt-2" size={20} />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              <option value="ServiceNow">ServiceNow</option>
              <option value="Jira">Jira</option>
              <option value="Freshservice">Freshservice</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SLA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ticket.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ticket.platform}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ticket.assignee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={getSLAColor(ticket.sla)}>{ticket.sla}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Tickets</p>
          <p className="text-2xl font-bold text-gray-900">{filteredTickets.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Open</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredTickets.filter((t) => t.status === 'Open').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">
            {filteredTickets.filter((t) => t.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">SLA Breached</p>
          <p className="text-2xl font-bold text-red-600">
            {filteredTickets.filter((t) => t.sla === 'Breached').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
