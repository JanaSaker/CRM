'use client';

import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const industries = ['Technology', 'Finance', 'Healthcare', 'Retail'];
const assignees = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];
const statuses = ['New', 'In Progress', 'Closed', 'Pending'];
const dealStatuses = ['Open', 'Won', 'Lost', 'Negotiation'];

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [contactType, setContactType] = useState<'individual' | 'company'>('individual');

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          width: '90%',
          maxWidth: '700px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ddd',
            paddingBottom: '12px',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6b46c1' }}>
            Create Lead
          </h2>
          <button
            onClick={onClose}
            style={{
              fontSize: '1.5rem',
              color: '#718096',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name="contactType"
              value="individual"
              checked={contactType === 'individual'}
              onChange={() => setContactType('individual')}
            />
            <span style={{ fontSize: '1rem' }}>Individual</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="radio"
              name="contactType"
              value="company"
              checked={contactType === 'company'}
              onChange={() => setContactType('company')}
            />
            <span style={{ fontSize: '1rem' }}>Company</span>
          </label>
        </div>

        <form
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <input
            type="text"
            placeholder="Enter Lead Name"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
            <option>Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Deal Value"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            placeholder="Enter Phone Number"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
            <option>Select Assignee</option>
            {assignees.map((assignee) => (
              <option key={assignee} value={assignee}>
                {assignee}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Closing Date"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
            <option>Select Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
            <option>Select Deal Status</option>
            {dealStatuses.map((dealStatus) => (
              <option key={dealStatus} value={dealStatus}>
                {dealStatus}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Source"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <input
            type="date"
            placeholder="Next Follow Up"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
        </form>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
