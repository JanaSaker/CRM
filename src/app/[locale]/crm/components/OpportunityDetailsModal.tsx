'use client';

import React, { useState } from 'react';

interface Opportunity {
  id: number;
  leadId: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  industry: string;
  assignedTo: string;
  status: string;
  nextFollowUp: string;
  dealValue: string;
  closingDate: string;
  dealStatus: string;
  createdAt: string;
  updatedAt: string;
  note: string;
}


interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Opportunity;
}

const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [activeTab, setActiveTab] = useState<'calls' | 'follow-up' | 'meetings' | 'notes'>('calls');

  if (!isOpen) return null;

  const mockCalls = [
    { id: 1, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '1 Hour', outcome: '00000', note: 'Lorem ipsum...' },
    { id: 2, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '30 Min', outcome: '00000', note: 'Lorem ipsum...' },
    { id: 3, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '45 Min', outcome: '00000', note: 'Lorem ipsum...' },
    { id: 4, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '20 Min', outcome: '00000', note: 'Lorem ipsum...' },
    { id: 5, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '1 Hour, 10 Min', outcome: '00000', note: 'Lorem ipsum...' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="max-w-6xl w-full bg-white rounded shadow-lg p-6 relative">
        {/* Close button (top-right) */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        {/* Header: General Details */}
        <h2 className="text-xl font-bold mb-4 border-b pb-2">General Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Lead ID:</strong> {data.leadId}
            </p>
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Note:</strong> <br />
              {data.note}
            </p>
          </div>
          <div>
            <p>
              <strong>Source:</strong> {data.source}
            </p>
            <p>
              <strong>Industry:</strong> {data.industry}
            </p>
            <p>
              <strong>Assigned to:</strong> {data.assignedTo}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {data.status}
              </span>
            </p>
            <p>
              <strong>Next Follow up:</strong> {data.nextFollowUp}
            </p>
          </div>
          <div>
            <p>
              <strong>Deal Value:</strong> {data.dealValue}
            </p>
            <p>
              <strong>Closing Date:</strong> {data.closingDate}
            </p>
            <p>
              <strong>Deal Status:</strong>{' '}
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {data.dealStatus}
              </span>
            </p>
            <p>
              <strong>Created at:</strong> {data.createdAt}
            </p>
            <p>
              <strong>Updated at:</strong> {data.updatedAt}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('calls')}
              className={`py-2 px-4 ${
                activeTab === 'calls'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calls
            </button>
            <button
              onClick={() => setActiveTab('follow-up')}
              className={`py-2 px-4 ${
                activeTab === 'follow-up'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Follow up
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`py-2 px-4 ${
                activeTab === 'meetings'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Meetings
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-2 px-4 ${
                activeTab === 'notes'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Notes
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'calls' && (
              <div className="relative border p-4 rounded-md">
                {/* The plus button to add a new call */}
                <button
                  onClick={() => alert('Add new call')}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl hover:bg-gray-400"
                  title="Add Call"
                >
                  +
                </button>

                {/* Example calls table */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">
                        <input type="checkbox" />
                      </th>
                      <th className="py-2 px-2">ID ⇵</th>
                      <th className="py-2 px-2">Sales rep ⇵</th>
                      <th className="py-2 px-2">Call Date ⇵</th>
                      <th className="py-2 px-2">Call Duration ⇵</th>
                      <th className="py-2 px-2">Outcome ⇵</th>
                      <th className="py-2 px-2">Note ⇵</th>
                    </tr>
                    {/* Filter row */}
                    <tr className="bg-gray-100 text-sm">
                      <td></td>
                      <td>
                        <input
                          className="w-full border px-1"
                          placeholder="Filter ID"
                        />
                      </td>
                      <td>
                        <input
                          className="w-full border px-1"
                          placeholder="Filter Rep"
                        />
                      </td>
                      <td>
                        <input
                          className="w-full border px-1"
                          placeholder="Filter Date"
                        />
                      </td>
                      <td>
                        <input
                          className="w-full border px-1"
                          placeholder="Filter Duration"
                        />
                      </td>
                      <td>
                        <input
                          className="w-full border px-1"
                          placeholder="Filter Outcome"
                        />
                      </td>
                      <td>
                        <input
                          className="w-full border px-1"
                          placeholder="Filter Note"
                        />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCalls.map((call) => (
                      <tr key={call.id} className="border-b hover:bg-gray-50">
                        <td className="py-2">
                          <input type="checkbox" />
                        </td>
                        <td className="py-2 px-2">{call.id}</td>
                        <td className="py-2 px-2">{call.salesRep}</td>
                        <td className="py-2 px-2">{call.callDate}</td>
                        <td className="py-2 px-2">{call.duration}</td>
                        <td className="py-2 px-2">{call.outcome}</td>
                        <td className="py-2 px-2">{call.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'follow-up' && (
              <div className="border p-4 rounded-md">
                <p>Follow-up content here...</p>
              </div>
            )}
            {activeTab === 'meetings' && (
              <div className="border p-4 rounded-md">
                <p>Meetings content here...</p>
              </div>
            )}
            {activeTab === 'notes' && (
              <div className="border p-4 rounded-md">
                <p>Notes content here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsModal;
