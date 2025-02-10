"use client";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import OpportunityDetails from "./OpportunityDetails";
import OpportunityTabs from "./OpportunityTabs";
import AddCallModal from "./AddCallModal";
import { Opportunity } from "@/types/Module";

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Opportunity;
}

const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({ isOpen, onClose, data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAddCallModalOpen, setIsAddCallModalOpen] = useState<boolean>(false);

  const mockCalls = [
    { id: 1, salesRep: "Name Here", callDate: "Jan 20,2025", duration: "1 Hour", outcome: "00000", note: "Lorem ipsum dolor sit amet..." },
    { id: 2, salesRep: "Name Here", callDate: "Jan 20,2025", duration: "30 Min", outcome: "00000", note: "Lorem ipsum dolor sit amet..." },
    { id: 3, salesRep: "Name Here", callDate: "Jan 20,2025", duration: "45 Min", outcome: "00000", note: "Lorem ipsum dolor sit amet..." },
  ];

  return (
    <>
      <Dialog
        visible={isOpen}
        onHide={onClose}
        maximizable
        style={{ width: "80vw", height: "80vh", maxWidth: "none" }}
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
          <OpportunityDetails data={data} />
          <OpportunityTabs activeIndex={activeIndex} onTabChange={setActiveIndex} calls={mockCalls} onAddCall={() => setIsAddCallModalOpen(true)} />
        </div>
      </Dialog>

      {/* Add Call Modal */}
      <AddCallModal isOpen={isAddCallModalOpen} onClose={() => setIsAddCallModalOpen(false)} />
    </>
  );
};

export default OpportunityDetailsModal;
