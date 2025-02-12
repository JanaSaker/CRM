"use client";

import React, { useState } from "react";
import OpportunityDetailsModal from "./OpportunityDetailsModal";
import { Opportunity } from "@/types/Module";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="border rounded p-4 cursor-pointer hover:shadow-md transition"
      >
        <h3 className="text-lg font-semibold">Opportunity #{opportunity.id}</h3>
        <p>{opportunity.name}</p>
        <p className="text-sm text-gray-600">{opportunity.phone}</p>
      </div>

      {isOpen && (
        <OpportunityDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          data={opportunity}
        />
      )}
    </>
  );
};

export default OpportunityCard;
