'use client';

import React, { useState } from 'react';

const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [contactType, setContactType] = useState<'individual' | 'company'>('individual');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-purple-700">Contact</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <div className="mt-4">
          <label className="flex items-center space-x-4">
            <input
              type="radio"
              name="contactType"
              value="individual"
              checked={contactType === 'individual'}
              onChange={() => setContactType('individual')}
            />
            <span>Individual</span>
            <input
              type="radio"
              name="contactType"
              value="company"
              checked={contactType === 'company'}
              onChange={() => setContactType('company')}
            />
            <span>Company</span>
          </label>
        </div>

        <form className="grid grid-cols-2 gap-4 mt-4">
          <input type="text" placeholder="Enter name" className="border p-2 rounded" />
          {contactType === 'company' && <input type="text" placeholder="Enter company name" className="border p-2 rounded" />}
          <input type="text" placeholder="Enter country" className="border p-2 rounded" />
          <input type="text" placeholder="Enter state" className="border p-2 rounded" />
          <input type="text" placeholder="Enter city" className="border p-2 rounded" />
          <input type="text" placeholder="Enter address" className="border p-2 rounded" />
          <input type="text" placeholder="Phone number" className="border p-2 rounded" />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="text" placeholder="Website" className="border p-2 rounded" />
        </form>

        <div className="mt-4 flex items-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Add</button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;