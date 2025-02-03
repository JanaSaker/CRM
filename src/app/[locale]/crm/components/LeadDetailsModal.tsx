'use client';

import React from 'react';
import { Button } from 'primereact/button';

export interface Lead {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
  source?: string;
  industry?: string;
  assignedTo?: string;
  dealValue?: string;
  closingDate?: string;
  dealStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  note?: string;
}

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ lead, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between border-b pb-3">
          <h2 className="text-xl font-bold">Lead Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <p>
            <strong>Name:</strong> {lead.name}
          </p>
          <p>
            <strong>Phone:</strong> {lead.number}
          </p>
          <p>
            <strong>Assigned to:</strong> {lead.assignedTo}
          </p>
          <p>
            <strong>Deal Value:</strong> {lead.dealValue}
          </p>
          <p>
            <strong>Closing Date:</strong> {lead.closingDate}
          </p>
          <p>
            <strong>Status:</strong> {lead.status}
          </p>
          <p className="col-span-2">
            <strong>Note:</strong> {lead.note}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
