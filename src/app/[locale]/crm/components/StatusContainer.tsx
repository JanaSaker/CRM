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
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
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
  const status: string[] = [
    "new",
    "qualified",
    "proposition",
    "won",
    "Asd",
    "asdas",
  ];

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
      title: "beeflex9",
      price: 10000,
      name: "contact name",
      number: "+96176123456",
    },
    {
      id: 10,
      status: "qualified",
      title: "beeflex10",
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

  ////this function is needed when using only draggable and not sortable
  // const onDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const updatedLeads = leads.map((lead) => {
  //     if (lead.id === +active.id) {
  //       return { ...lead, status: over.id as string };
  //     }
  //     return lead;
  //   });
  //   setLeads(updatedLeads);
  // };

  const onDragStart = function (event: DragStartEvent) {
    if (event.active.data.current?.type === "Lead") {
      setActiveLead(event.active.data.current.lead);
      return;
    }
  };

  const onDragOver = function (event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveLead = active.data.current?.type === "Lead";
    const isOverLead = over.data.current?.type === "Lead";

    if (!isActiveLead) return;

    //dropping a lead over another lead
    if (isActiveLead && isOverLead) {
      setLeads((leads) => {
        const activeIndex = leads.findIndex((lead) => lead.id === activeId);
        const overIndex = leads.findIndex((lead) => lead.id === overId);

        if (leads[activeIndex].status !== leads[overIndex].status) {
          leads[activeIndex].status = leads[overIndex].status;
        }

        return arrayMove(leads, activeIndex, overIndex);
      });
    }

    const isOverStatus = over.data.current?.type === "Status";

    //dropping a lead over a status column

    if (isActiveLead && isOverStatus) {
      setLeads((leads) => {
        const activeIndex = leads.findIndex((lead) => lead.id === activeId);

        if (leads[activeIndex].status !== overId.toString()) {
          leads[activeIndex].status = overId.toString();
        }

        return arrayMove(leads, activeIndex, activeIndex);
      });
    }
  };

  return (
    <div className="overflow-y-hidden">
      <header className="flex fixed w-full justify-center m-6">
        <InputText placeholder="Search" />
        <Button
          className="rounded-full w-8 h-8 p-5 text-white bg-blue-500 flex justify-center items-center"
          onClick={() => setIsContactModalOpen(true)}
        >
          Add
        </Button>
      </header>

      <DndContext onDragStart={onDragStart} onDragOver={onDragOver}>
        <div className="w-fit mt-14 flex gap-4 p-8 h-[83.3vh] ">
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
    </div>
  );
};

export default StatusContainer;
