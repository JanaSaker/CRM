import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

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
  onLeadClick: (lead: LeadType) => void;
}

const borderColors: Record<string, string> = {
  new: "border-red-500",
  qualified: "border-blue-500",
  proposition: "border-purple-500",
  won: "border-green-500",
};

const Lead: React.FC<LeadProps> = ({ lead, onLeadClick }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: lead.id.toString(),
  });

  // Compute style for the Draggable transform
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`p-4 mb-2 rounded-md bg-slate-50 border-l-8 ${
        borderColors[lead.status]
      } ${isDragging ? "opacity-80" : ""}`}
    >
      {/* --- The draggable "handle" --- */}
      <div
        className="cursor-grab inline-block mr-3 bg-gray-200 p-2 rounded hover:bg-gray-300"
        // Apply the drag attributes to only this handle
        {...attributes}
        {...listeners}
        title="Drag me"
      >
        <svg
          width="16"
          height="16"
          fill="currentColor"
          className="text-gray-600"
          viewBox="0 0 16 16"
        >
          <path d="M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 ...etc" />
        </svg>
      </div>

      {/* --- The rest of the lead item, not draggable --- */}
      <div className="inline-block align-middle">
        <p className="font-semibold">{lead.title}</p>
        <p>Price: ${lead.price}</p>
        <p>Contact: {lead.name}</p>
        <p>{lead.number}</p>

        <button
          className="mt-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onLeadClick(lead)}
        >
          Details
        </button>
      </div>
    </li>
  );
};

export default Lead;
