import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface LeadType {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
}

interface LeadProps {
  lead: LeadType;
  grabbed: boolean;
  onLeadClick: (lead: LeadType) => void;
}

const borderColors: Record<string, string> = {
  new: "border-red-500",
  qualified: "border-blue-500",
  proposition: "border-purple-500",
  won: "border-green-500",
};

const Lead: React.FC<LeadProps> = ({ lead, onLeadClick, grabbed }) => {
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
      <button
        style={style}
        className={`mt-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 absolute bottom-3 right-3 ${
          grabbed && "scale-[1.03]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onLeadClick(lead);
        }}
      >
        Details
      </button>
    </div>
  );
};

export default Lead;
