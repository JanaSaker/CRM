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
}

const borderColors: Record<string, string> = {
  new: "border-red-500",
  qualified: "border-blue-500",
  proposition: "border-purple-500",
  won: "border-green-500",
};

const Lead: React.FC<LeadProps> = ({ lead }) => {
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
      className={`p-4 mb-2 rounded-md bg-slate-50 border-l-8 border- ${
        borderColors[lead.status]
      } ${isDragging ? "opacity-80" : ""}`}
    >
      <p className="font-semibold">{lead.title}</p>
      <p>Price: ${lead.price}</p>
      <p>Contact: {lead.name}</p>
      <p>{lead.number}</p>
    </li>
  );
};

export default Lead;
