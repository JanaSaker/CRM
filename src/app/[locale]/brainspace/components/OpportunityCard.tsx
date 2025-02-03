'use client';

import React from 'react';

const staticOpportunity = {
  name: "Zainab Karaki's Opportunity",
  expectedRevenue: "0.00 J-J",
  probability: 50.0,
  contact: "Zainab Karaki",
  email: "zainabkaraki@gmail.com",
  phone: "N/A",
  salesperson: "Zainab Karaki",
  expectedClosing: 3,
  stage: "Proposition"
};

const OpportunityCard: React.FC = () => {
  const stages = ["New", "Qualified", "Proposition", "Won"];
  const stageIndex = stages.indexOf(staticOpportunity.stage);

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-full max-w-5xl mx-auto p-6 border rounded-lg shadow-lg bg-white overflow-auto">
        <div className="flex justify-between mb-4">
          <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">Won</span>
          <span className="px-4 py-1 border border-gray-400 rounded-lg">Lost</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{staticOpportunity.name}</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Expected Revenue:</strong> {staticOpportunity.expectedRevenue}</p>
          <p><strong>Probability:</strong> {staticOpportunity.probability}%</p>
          <p><strong>Contact:</strong> {staticOpportunity.contact}</p>
          <p><strong>Email:</strong> {staticOpportunity.email}</p>
          <p><strong>Phone:</strong> {staticOpportunity.phone}</p>
          <p><strong>Salesperson:</strong> {staticOpportunity.salesperson}</p>
          <p className="flex items-center">
            <strong>Expected Closing:</strong> {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`ml-1 text-lg ${i < staticOpportunity.expectedClosing ? 'text-yellow-500' : 'text-gray-400'}`}>
                ★
              </span>
            ))}
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Progress:</p>
          <div className="flex items-center gap-2 mt-2">
            {stages.map((stage, index) => (
              <span
                key={stage}
                className={`text-sm font-semibold px-2 py-1 rounded-lg ${
                  index === stageIndex ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {stage}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 mt-2 rounded-lg">
            <div className="bg-blue-600 h-2 rounded-lg" style={{ width: `${(stageIndex / (stages.length - 1)) * 100}%` }}></div>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Internal Notes</p>
          <textarea className="w-full mt-2 p-2 border rounded" placeholder="Add a description..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
