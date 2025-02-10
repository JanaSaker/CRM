'use client';

import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import AddCallModal from './AddCallModal'; // Ensure the correct path

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAddCallModalOpen, setIsAddCallModalOpen] = useState<boolean>(false);

  const mockCalls = [
    { id: 1, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '1 Hour', outcome: '00000', note: 'Lorem ipsum dolor sit amet consectetur...' },
    { id: 2, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '30 Min', outcome: '00000', note: 'Lorem ipsum dolor sit amet consectetur...' },
    { id: 3, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '45 Min', outcome: '00000', note: 'Lorem ipsum dolor sit amet consectetur...' },
    { id: 4, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '20 Min', outcome: '00000', note: 'Lorem ipsum dolor sit amet consectetur...' },
    { id: 5, salesRep: 'Name Here', callDate: 'Jan 20,2025', duration: '1 Hour, 10 Min', outcome: '00000', note: 'Lorem ipsum dolor sit amet consectetur...' },
  ];

  return (
    <>
      <Dialog
        visible={isOpen}
        onHide={onClose}
        style={{ width: '100vw', height: '100vh', maxWidth: 'none' }}
        contentStyle={{ height: 'calc(100vh - 40px)', overflow: 'hidden' }}
        modal
        dismissableMask
      >
        {/* Header */}
        <div className="p-4 bg-gray-900 text-white font-bold text-lg flex justify-between items-center">
          <span>General Details</span>
          <Button icon="pi pi-times" className="p-button-text text-white text-xl" onClick={onClose} />
        </div>

        {/* Main Content */}
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          {/* Details Section */}
          <div className="p-6 bg-white rounded-md shadow-md">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>Lead ID:</strong> {data.leadId}</p>
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Phone:</strong> {data.phone}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Note:</strong></p>
                <div className="p-3 border rounded bg-gray-50">{data.note}</div>
              </div>
              <div>
                <p><strong>Source:</strong> {data.source}</p>
                <p><strong>Industry:</strong> {data.industry}</p>
                <p><strong>Assigned to:</strong> {data.assignedTo}</p>
                <p>
                  <strong>Status:</strong> <Tag severity="success" value={data.status} />
                </p>
                <p><strong>Next Follow-up:</strong> {data.nextFollowUp}</p>
              </div>
              <div>
                <p><strong>Deal Value:</strong> {data.dealValue}</p>
                <p><strong>Closing Date:</strong> {data.closingDate}</p>
                <p>
                  <strong>Deal Status:</strong> <Tag severity="success" value={data.dealStatus} />
                </p>
                <p><strong>Created at:</strong> {data.createdAt}</p>
                <p><strong>Updated at:</strong> {data.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="mt-6">
            <TabPanel header="Calls">
              <div className="relative p-4 bg-white rounded-md shadow-md">
                <Button
                  icon="pi pi-plus"
                  className="p-button-rounded p-button-secondary absolute top-[-45px] right-0 w-10 h-10 flex items-center justify-center border border-gray-300 shadow-lg"
                  onClick={() => setIsAddCallModalOpen(true)}
                  tooltip="Add Call"
                />
                <DataTable value={mockCalls} paginator rows={5} className="mt-4">
                  <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                  <Column field="id" header="ID" sortable filter filterPlaceholder="Filter ID"></Column>
                  <Column field="salesRep" header="Sales Rep" sortable filter filterPlaceholder="Filter Rep"></Column>
                  <Column field="callDate" header="Call Date" sortable filter filterPlaceholder="Filter Date"></Column>
                  <Column field="duration" header="Call Duration" sortable filter filterPlaceholder="Filter Duration"></Column>
                  <Column field="outcome" header="Outcome" sortable filter filterPlaceholder="Filter Outcome"></Column>
                  <Column field="note" header="Note" sortable filter filterPlaceholder="Filter Note"></Column>
                </DataTable>
              </div>
            </TabPanel>

            <TabPanel header="Follow up">
              <div className="p-4 bg-white rounded-md shadow-md">Follow-up content here...</div>
            </TabPanel>

            <TabPanel header="Meetings">
              <div className="p-4 bg-white rounded-md shadow-md">Meetings content here...</div>
            </TabPanel>

            <TabPanel header="Notes">
              <div className="p-4 bg-white rounded-md shadow-md">Notes content here...</div>
            </TabPanel>
          </TabView>
        </div>
      </Dialog>

      {/* AddCallModal rendered on top */}
      <AddCallModal
        isOpen={isAddCallModalOpen}
        onClose={() => setIsAddCallModalOpen(false)}
      />
    </>
  );
};

export default OpportunityDetailsModal;
