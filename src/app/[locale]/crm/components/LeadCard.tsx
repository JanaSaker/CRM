import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "primereact/button";
import { Lead as LeadType } from "@/redux/slices/leadsSlice";
import OpportunityDetailsModal from "./OpportunityDetailsModal";

interface LeadProps {
  lead: LeadType;
  grabbed: boolean;
}

const borderColors: Record<string, string> = {
  new: "border-red-500",
  qualified: "border-blue-500",
  proposition: "border-purple-500",
  won: "border-green-500",
};

const LeadCard: React.FC<LeadProps> = ({ lead, grabbed }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(
    null
  );
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: lead.id,
    data: {
      type: "Lead",
      lead,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const handleLeadClick = (lead: LeadType) => {
    setSelectedOpportunity(lead);
    setIsOpportunityModalOpen(true);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-slate-100 p-4 mb-2 rounded-md h-32 border-2 ${
          borderColors[lead.status]
        }`}
      />
    );
  }

  return (
    <div ref={setNodeRef} className={`relative`}>
      <div
        {...listeners}
        {...attributes}
        style={style}
        className={`p-4 mb-2 rounded-md h-32 bg-slate-100 border-l-8 cursor-grab  ${
          grabbed && "cursor-grabbing shadow-xl scale-[1.05] opacity-85"
        } ${borderColors[lead.status]} `}
      >
        <p className="font-semibold">{lead.title}</p>
        <p>Price: ${lead.price}</p>
        <p>Contact: {lead.name}</p>
        <p>{lead.number}</p>
      </div>
      <Button
        icon="pi pi-ellipsis-v"
        style={style}
        className={`absolute top-2 right-2 ${grabbed && "scale-[1.03]"}`}
        onClick={(e) => {
          e.stopPropagation();
          handleLeadClick(lead);
        }}
      />
      {selectedOpportunity && (
        <OpportunityDetailsModal
          isOpen={isOpportunityModalOpen}
          onClose={() => setIsOpportunityModalOpen(false)}
          data={selectedOpportunity}
        />
      )}
    </div>
  );
};

export default LeadCard;
