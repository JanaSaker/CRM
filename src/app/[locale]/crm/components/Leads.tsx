import React from "react";
import Lead from "./Lead";
import { useDroppable } from "@dnd-kit/core";

interface Lead {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
}

interface LeadsProps {
  status: string;
  leads: Lead[];
}

const statusColors: Record<string, string> = {
  new: "bg-red-500",
  qualified: "bg-blue-500",
  proposition: "bg-purple-500",
  won: "bg-green-500",
};

const Leads: React.FC<LeadsProps> = ({ status, leads }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`border rounded-lg shadow-md h-full bg-white p-4`}
    >
      <div className="flex gap-2 items-center">
        <div className={`rounded-full w-4 h-4 ${statusColors[status]}`}></div>
        <h2 className={`font-bold`}>{status.toUpperCase()}</h2>
      </div>
      <ul className="mt-2 w-80">
        {leads.map((lead) => (
          <Lead key={lead.id} lead={lead} />
        ))}
      </ul>
    </div>
  );
};

export default Leads;
