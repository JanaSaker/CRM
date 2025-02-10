import React from "react";
import { Tag } from "primereact/tag";
import { Opportunity } from "@/types/Module";

interface OpportunityDetailsProps {
  data: Opportunity;
}

const OpportunityDetails: React.FC<OpportunityDetailsProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Lead ID:</strong> {data.leadId}</p>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Note:</strong></p>
          <div className="p-3 border rounded bg-gray-50">{data.note}</div>
        </div>
        <div>
          <p><strong>Source:</strong> {data.source}</p>
          <p><strong>Industry:</strong> {data.industry}</p>
          <p><strong>Assigned to:</strong> {data.assignedTo}</p>
          <p><strong>Status:</strong> <Tag severity="success" value={data.status} /></p>
          <p><strong>Next Follow-up:</strong> {data.nextFollowUp}</p>
        </div>
        <div>
          <p><strong>Deal Value:</strong> {data.dealValue}</p>
          <p><strong>Closing Date:</strong> {data.closingDate}</p>
          <p><strong>Deal Status:</strong> <Tag severity="success" value={data.dealStatus} /></p>
          <p><strong>Created at:</strong> {data.createdAt}</p>
          <p><strong>Updated at:</strong> {data.updatedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;
