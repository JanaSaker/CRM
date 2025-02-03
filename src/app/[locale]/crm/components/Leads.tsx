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
  new: "red-500",
  qualified: "blue-500",
  proposition: "purple-500",
  won: "green-500",
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
      <h2 className={`text-${statusColors[status]} font-bold`}>
        {status.toUpperCase()}
      </h2>
      <ul className="mt-2 w-80">
        {leads.map((lead) => (
          <Lead key={lead.id} lead={lead} color={statusColors[status]} />
        ))}
      </ul>
    </div>
  );
};

export default Leads;
