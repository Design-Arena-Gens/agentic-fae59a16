'use client';

import { useState } from 'react';
import { UserPlus, UserMinus, Search, Edit, MoreVertical } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'onboard' | 'offboard' | null>(null);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'Active',
      hireDate: '2022-03-15',
      devices: 2,
      lastLogin: '2024-01-15 14:32',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Marketing',
      role: 'Marketing Manager',
      status: 'Active',
      hireDate: '2021-07-20',
      devices: 3,
      lastLogin: '2024-01-15 16:45',
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      department: 'Sales',
      role: 'Account Executive',
      status: 'Active',
      hireDate: '2023-01-10',
      devices: 2,
      lastLogin: '2024-01-15 11:20',
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      department: 'Engineering',
      role: 'DevOps Engineer',
      status: 'Active',
      hireDate: '2022-11-05',
      devices: 4,
      lastLogin: '2024-01-15 15:10',
    },
    {
      id: 5,
      name: 'Alex Wong',
      email: 'alex.wong@company.com',
      department: 'Product',
      role: 'Product Manager',
      status: 'On Leave',
      hireDate: '2020-09-12',
      devices: 2,
      lastLogin: '2024-01-10 09:30',
    },
    {
      id: 6,
      name: 'Lisa Martinez',
      email: 'lisa.martinez@company.com',
      department: 'HR',
      role: 'HR Coordinator',
      status: 'Active',
      hireDate: '2023-04-18',
      devices: 2,
      lastLogin: '2024-01-15 13:05',
    },
    {
      id: 7,
      name: 'David Kim',
      email: 'david.kim@company.com',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'Active',
      hireDate: '2021-12-01',
      devices: 1,
      lastLogin: '2024-01-15 10:15',
    },
    {
      id: 8,
      name: 'Rachel Green',
      email: 'rachel.green@company.com',
      department: 'Engineering',
      role: 'QA Engineer',
      status: 'Offboarding',
      hireDate: '2022-06-22',
      devices: 1,
      lastLogin: '2024-01-12 16:00',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offboarding':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleModalOpen = (type: 'onboard' | 'offboard') => {
    setModalType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalType(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage user onboarding, offboarding, and access provisioning</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleModalOpen('onboard')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <UserPlus size={20} />
            Onboard User
          </button>
          <button
            onClick={() => handleModalOpen('offboard')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <UserMinus size={20} />
            Offboard User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Total Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {users.filter((u) => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">On Leave</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {users.filter((u) => u.status === 'On Leave').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">Offboarding</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {users.filter((u) => u.status === 'Offboarding').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Offboarding">Offboarding</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devices
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.devices} device{user.devices !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {modalType === 'onboard' ? 'User Onboarding Workflow' : 'User Offboarding Workflow'}
            </h3>

            {modalType === 'onboard' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Onboarding Checklist</h4>
                  <ul className="space-y-2 text-sm text-blue-900">
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Create Active Directory account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Provision Office 365 email and licenses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Setup workstation (laptop/desktop)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Install required software and applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Configure VPN access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Grant access to shared drives and resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Provision mobile device (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Add to department distribution lists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Schedule IT orientation and training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Create ServiceNow ticket for tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Manager"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-3">Offboarding Checklist</h4>
                  <ul className="space-y-2 text-sm text-red-900">
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Disable Active Directory account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Revoke Office 365 licenses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Remove from all distribution lists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Revoke VPN and network access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Remove access to shared drives and applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Collect company devices (laptop, mobile, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Wipe and decommission devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Forward email to manager (if required)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Archive user data per retention policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Update asset management system</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Select User</option>
                    {users
                      .filter((u) => u.status === 'Active')
                      .map((u) => (
                        <option key={u.id}>{u.name}</option>
                      ))}
                  </select>
                  <input
                    type="date"
                    placeholder="Last Day"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleModalClose}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                className={`flex-1 ${
                  modalType === 'onboard' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                } text-white px-4 py-2 rounded-lg transition-colors`}
              >
                {modalType === 'onboard' ? 'Start Onboarding' : 'Start Offboarding'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
