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
    if (!over || active.id === over.id) return;

    const activeLeadId = active.id;
    const overId = over.id;
    const activeIndex = leads.findIndex((lead) => lead.id === activeLeadId);
    const overIndex = leads.findIndex((lead) => lead.id === overId);

    if (over.data.current?.type === "Lead") {
      dispatch(reorderLeads({ fromIndex: activeIndex, toIndex: overIndex }));
    } else if (over.data.current?.type === "Status") {
      dispatch(updateLeadStatus({ id: +activeLeadId, status: overId.toString() }));
    }
  };

  return (
    <div className="overflow-y-hidden h-[91.5vh]">
      <Header />
      <DndContext onDragStart={onDragStart} onDragOver={onDragOver}>
        <div className="w-fit mt-14 flex gap-4 p-8 h-[90%]">
          {statusColumns.map((status) => (
            <Leads key={status} status={status} leads={leads.filter((lead) => lead.status === status)} />
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
  