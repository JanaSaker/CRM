// src/types.ts
export interface Module {
    id: number | null;
    name: string;
    link: string;
    image?: {
        path: string | null; // Optional
    };
    active: boolean;
}

// Define the Attachment interface
export interface Attachment {
    id: number;
    path: string;
    fileName: string;
    type: string;
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
  