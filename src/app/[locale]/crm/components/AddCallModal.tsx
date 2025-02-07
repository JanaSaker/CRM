'use client';

import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

const AddCallModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [salesRep, setSalesRep] = useState<string | null>(null);
  const [callDate, setCallDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState('');
  const [outcome] = useState('01/02/2025'); // Default outcome
  const [note, setNote] = useState('');

  const salesRepOptions = [
    { label: 'Employee 1', value: 'employee1' },
    { label: 'Employee 2', value: 'employee2' },
    { label: 'Employee 3', value: 'employee3' },
  ];

  return (
    <Dialog
      visible={isOpen}
      onHide={onClose}
      style={{
        width: '45vw',
        maxWidth: '600px',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
      className="rounded-lg"
      modal
      dismissableMask
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-white rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800">Add Call</h2>
        <Button icon="pi pi-times" className="p-button-text text-gray-600" onClick={onClose} />
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <div className="grid grid-cols-2 gap-6">
          {/* Sales Rep ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Sales rep ID</label>
            <Dropdown
              value={salesRep}
              onChange={(e) => setSalesRep(e.value)}
              options={salesRepOptions}
              placeholder="Employee name"
              className="w-full p-inputtext border-gray-300 rounded-md"
            />
          </div>

          {/* Call Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Call Date</label>
            <Calendar
              value={callDate}
              onChange={(e) => setCallDate(e.value as Date)}
              placeholder="Enter call date"
              className="w-full p-inputtext border-gray-300 rounded-md"
            />
          </div>

          {/* Call Duration */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Call Duration</label>
            <InputText
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter call duration"
              className="w-full border-gray-300 rounded-md"
            />
          </div>

          {/* Outcome (Pre-filled) */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Outcome</label>
            <InputText value={outcome} disabled className="w-full border-gray-300 bg-gray-100 rounded-md" />
          </div>

          {/* Note */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Note</label>
            <InputTextarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note"
              rows={4}
              className="w-full border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Footer - Create Button */}
      <div className="p-4 border-t border-gray-200 bg-white flex justify-center">
        <Button label="Create" className="w-full p-3 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600" />
      </div>
    </Dialog>
  );
};

export default AddCallModal;
