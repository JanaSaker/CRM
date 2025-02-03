"use client";

import React, { useState } from "react";
import Leads from "./Leads";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

interface Lead {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
}

const StatusContainer: React.FC = () => {
  const status: string[] = ["new", "qualified", "proposition", "won"];

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      status: "new",
      title: "beeflex1",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 2,
      status: "new",
      title: "beeflex2",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 3,
      status: "qualified",
      title: "beeflex3",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 4,
      status: "qualified",
      title: "beeflex4",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 5,
      status: "proposition",
      title: "beeflex5",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 6,
      status: "won",
      title: "beeflex6",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
  ]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const updatedLeads: Lead[] = leads.map((lead) => {
      if (lead.id === +active.id) {
        return { ...lead, status: over?.id as string };
      }
      return lead;
    });
    setLeads(updatedLeads);
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-8 h-[92vh]">
        {status.map((s, i) => (
          <Leads
            key={i}
            status={s}
            leads={leads.filter((lead) => lead.status === s)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default StatusContainer;
