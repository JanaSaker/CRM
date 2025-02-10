"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateLeadStatus, reorderLeads } from "@/redux/slices/leadsSlice";
import Leads from "./Leads";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import LeadCard from "./LeadCard";
import Header from "./Header";
import { Lead } from "@/redux/slices/leadsSlice";

const statusColumns = ["new", "qualified", "proposition", "won"];

const LeadsManager: React.FC = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state: RootState) => state.leads.leads);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

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
    const isOverStatus = over.data.current?.type === "Status";

    if (!isActiveLead) return;

    if (isActiveLead && isOverLead) {
      const activeIndex = leads.findIndex((lead) => lead.id === activeId);
      const overIndex = leads.findIndex((lead) => lead.id === overId);

      ////dropping the lead over in the same column
      if (leads[activeIndex].status !== leads[overIndex].status) {
        dispatch(
          updateLeadStatus({ id: +activeId, status: leads[overIndex].status })
        );
      }

      dispatch(reorderLeads({ fromIndex: activeIndex, toIndex: overIndex }));
    }

    ////dropping the lead over a different column
    if (isActiveLead && isOverStatus) {
      const activeIndex = leads.findIndex((lead) => lead.id === activeId);

      dispatch(updateLeadStatus({ id: +activeId, status: overId.toString() }));
    }
  };

  return (
    <div className="overflow-y-hidden h-[91.5vh]">
      <Header />
      <DndContext onDragStart={onDragStart} onDragOver={onDragOver}>
        <div className="w-fit mt-14 flex gap-4 p-8 h-[90%]">
          {statusColumns.map((status) => (
            <Leads
              key={status}
              status={status}
              leads={leads.filter((lead) => lead.status === status)}
            />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {activeLead && <LeadCard lead={activeLead} grabbed />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default LeadsManager;
