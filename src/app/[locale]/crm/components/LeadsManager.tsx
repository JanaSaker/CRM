"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  updateLeadStatus,
  reorderLeads,
} from "../../../../redux/slices/leadsSlice";
import Leads from "./Leads";
import OpportunityDetailsModal from "./OpportunityDetailsModal";
import ContactModal from "./ContactModal";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { InputText } from "primereact/inputtext";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import LeadCard from "./LeadCard";
import { Lead } from "../../../../redux/slices/leadsSlice";

const LeadsManager: React.FC = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state: RootState) => state.leads.leads);
  const status = ["new", "qualified", "proposition", "won"];

  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(
    null
  );
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const handleLeadClick = (lead: Lead) => {
    setSelectedOpportunity(lead);
    setIsOpportunityModalOpen(true);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Lead") {
      setActiveLead(event.active.data.current.lead as Lead);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveLead = active.data.current?.type === "Lead";
    const isOverLead = over.data.current?.type === "Lead";

    if (!isActiveLead) return;

    // Dropping a lead over another lead
    if (isActiveLead && isOverLead) {
      const activeIndex = leads.findIndex((lead) => lead.id === activeId);
      const overIndex = leads.findIndex((lead) => lead.id === overId);

      if (leads[activeIndex].status !== leads[overIndex].status) {
        dispatch(
          updateLeadStatus({ id: +activeId, status: leads[overIndex].status })
        );
      }

      dispatch(reorderLeads({ fromIndex: activeIndex, toIndex: overIndex }));
    }
  };

  return (
    <div className="overflow-y-hidden h-[91.5vh]">
      <header className="flex absolute box-border w-full p-4  gap-2">
        <InputText placeholder="Search" className="ml-[43%]" />
        <div className="flex gap-4 ml-auto">
          <ButtonGroup>
            <Button
              icon="pi pi-objects-column"
              className="bg-amber-200 h-8 w-10"
            />
            <Button className="h-8 w-10 bg-gray-300" icon="pi pi-list" />
          </ButtonGroup>
          <Button
            className="w-9 h-9 text-white bg-blue-500"
            icon="pi pi-plus"
            rounded
            onClick={() => setIsContactModalOpen(true)}
          />
        </div>
      </header>

      <DndContext onDragStart={onDragStart} onDragOver={onDragOver}>
        <div className="w-fit mt-14 flex gap-4 p-8 h-[90%]">
          {status.map((s) => (
            <Leads
              key={s}
              status={s}
              leads={leads.filter((lead) => lead.status === s)}
              onLeadClick={handleLeadClick}
            />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {activeLead && (
              <LeadCard
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

export default LeadsManager;
