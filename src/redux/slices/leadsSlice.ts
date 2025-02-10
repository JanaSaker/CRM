import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

export interface Lead {
  id: number;
  status: string;
  title: string;
  price: number;
  name: string;
  number: string;
}

export interface Opportunity {
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

interface LeadsState {
  leads: Lead[];
}

const initialState: LeadsState = {
  leads: [
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
  ],
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    updateLeadStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const lead = state.leads.find((lead) => lead.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
      }
    },
    reorderLeads: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      state.leads = arrayMove(
        state.leads,
        action.payload.fromIndex,
        action.payload.toIndex
      );
    },
  },
});

export const { updateLeadStatus, reorderLeads } = leadsSlice.actions;
export default leadsSlice.reducer;
