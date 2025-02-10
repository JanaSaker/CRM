import React, { useMemo } from "react";
import LeadCard from "./LeadCard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

interface LeadType {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
}

interface LeadsProps {
  status: string;
  leads: LeadType[];
  onLeadClick: (lead: LeadType) => void;
}

const statusColors: Record<string, string> = {
  new: "bg-red-500",
  qualified: "bg-blue-500",
  proposition: "bg-purple-500",
  won: "bg-green-500",
};

const Leads: React.FC<LeadsProps> = ({ status, leads, onLeadClick }) => {
  const leadsIds = useMemo(() => {
    return leads.map((lead) => lead.id);
  }, [leads]);

  const { setNodeRef } = useSortable({
    id: status,
    data: {
      type: "Status",
      status,
    },
  });

  return (
    <div className="relative">
      <div className="flex gap-2 items-center p-4 absolute z-50 bg-white rounded-t-lg w-[95%]">
        <div className={`rounded-full w-4 h-4 ${statusColors[status]}`}></div>
        <h2 className="font-bold">{status.toUpperCase()}</h2>
      </div>
      <div
        ref={setNodeRef}
        className="border rounded-lg shadow-md h-full bg-white px-4 overflow-y-auto overflow-hidden"
      >
        <div className="mt-14 w-80 ">
          <SortableContext items={leadsIds}>
            {leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onLeadClick={onLeadClick}
                grabbed={false}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default Leads;
