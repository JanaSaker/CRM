"use client";

import React, { useState } from "react";
import Leads from "./Leads";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import OpportunityDetailsModal from "./OpportunityDetailsModal";
import ContactModal from "./ContactModal";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Lead from "./Lead";

interface Lead {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
}

interface Opportunity {
  id: number;
  leadId: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  industry: string;
  assignedTo: string;
  status: string;
  nextFollowUp: string;
  dealValue: string;
  closingDate: string;
  dealStatus: string;
  createdAt: string;
  updatedAt: string;
  note: string;
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
      status: "new",
      title: "beeflex3",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 4,
      status: "new",
      title: "beeflex4",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 5,
      status: "qualified",
      title: "beeflex5",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 6,
      status: "qualified",
      title: "beeflex6",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 7,
      status: "proposition",
      title: "beeflex7",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 8,
      status: "won",
      title: "beeflex8",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 9,
      status: "won",
      title: "beeflex8",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 10,
      status: "qualified",
      title: "beeflex8",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
  ]);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const mapLeadToOpportunity = (lead: Lead): Opportunity => {
    return {
      id: lead.id,
      leadId: lead.id,
      name: lead.name,
      phone: lead.number,
      email: "",
      source: "",
      industry: "",
      assignedTo: "",
      status: lead.status,
      nextFollowUp: "",
      dealValue: lead.price.toString(),
      closingDate: "",
      dealStatus: "Open",
      createdAt: "",
      updatedAt: "",
      note: lead.title ?? "",
    };
  };

  const handleLeadClick = (lead: Lead) => {
    const converted = mapLeadToOpportunity(lead);
    setSelectedOpportunity(converted);
    setIsOpportunityModalOpen(true);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const updatedLeads = leads.map((lead) => {
      if (lead.id === +active.id) {
        return { ...lead, status: over.id as string };
      }
      return lead;
    });
    setLeads(updatedLeads);
  };

  const onDragStart = function (event: DragStartEvent) {
    console.log(event.active.data.current?.lead);
    if (event.active.data.current?.type === "Lead") {
      setActiveLead(event.active.data.current.lead);
      return;
    }
  };

  return (
    <>
      <header className="flex justify-center w-full m-4">
        <InputText placeholder="Search" />
        <Button
          className="rounded-full w-8 h-8 p-5 text-white bg-blue-500 flex justify-center items-center"
          onClick={() => setIsContactModalOpen(true)}
        >
          Add
        </Button>
      </header>
      <DndContext onDragStart={onDragStart}>
        <div className="flex gap-4 p-8 h-[92vh]">
          <SortableContext items={status}>
            {status.map((s) => (
              <Leads
                key={s}
                status={s}
                leads={leads.filter((lead) => lead.status === s)}
                onLeadClick={handleLeadClick}
              />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeLead && (
              <Lead
                lead={activeLead}
                onLeadClick={handleLeadClick}
                grabbed={true}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      {selectedOpportunity && (
        <OpportunityDetailsModal
          isOpen={isOpportunityModalOpen}
          onClose={() => setIsOpportunityModalOpen(false)}
          data={selectedOpportunity}
        />
      )}

      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
    </>
  );
};

export default StatusContainer;
