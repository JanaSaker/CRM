'use client';

import React from 'react';

interface CallLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const salesReps = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];

const CallLogModal: React.FC<CallLogModalProps> = ({ isOpen, onClose }) => {
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
          maxWidth: '600px',
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
            Log Call
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

        <form
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
            <option>Employee Name</option>
            {salesReps.map((rep) => (
              <option key={rep} value={rep}>
                {rep}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Enter call date"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            placeholder="Enter call duration"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <input
            type="date"
            placeholder="Outcome"
            defaultValue="2025-02-01"
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <textarea
            placeholder="Add note"
            rows={3}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              gridColumn: 'span 2',
            }}
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

export default CallLogModal;
