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
  color: string;
}

const Lead: React.FC<LeadProps> = ({ lead, color }) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: lead.id.toString(),
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-4 mb-2 rounded-md bg-slate-50 border-l-8 border-${color} ${
        isDragging ? "opacity-80" : ""
      }`}
    >
      <p className="font-semibold">{lead.title}</p>
      <p>Price: ${lead.price}</p>
      <p>Contact: {lead.name}</p>
      <p>{lead.number}</p>
    </li>
  );
};

export default Lead;
