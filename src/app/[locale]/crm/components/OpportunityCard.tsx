'use client';

import React, { useState } from 'react';
import OpportunityDetailsModal from './OpportunityDetailsModal';

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

const sampleOpportunity: Opportunity = {
  id: 1,
  leadId: 20,
  name: 'Lead Name Here',
  phone: '+961 70 123 456',
  email: 'leademployee@gmail.com',
  source: 'Lead source here',
  industry: 'Trading',
  assignedTo: 'John Smith',
  status: 'Completed',
  nextFollowUp: 'Feb 20,2025',
  dealValue: '$10,000',
  closingDate: 'Mar 30,2025',
  dealStatus: 'Won',
  createdAt: 'Jan 20,2025',
  updatedAt: 'Jan 25,2025',
  note: 'Lorem ipsum dolor sit amet consectetur. Fusce morbi quis suspendisse massa dictum in eleifend bibendum. Aliquet mollis sem nulla vestibulum.',
};

const OpportunityCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* A small card or button to open the modal */}
      <div
        onClick={() => setIsOpen(true)}
        className="border rounded p-4 cursor-pointer hover:shadow-md"
      >
        <h3 className="text-lg font-semibold">Opportunity #{sampleOpportunity.id}</h3>
        <p>{sampleOpportunity.name}</p>
        <p className="text-sm text-gray-600">{sampleOpportunity.phone}</p>
      </div>

      <OpportunityDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={sampleOpportunity}
      />
    </>
  );
};

export default OpportunityCard;
