import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Call {
  id: number;
  salesRep: string;
  callDate: string;
  duration: string;
  outcome: string;
  note: string;
}

interface OpportunityCallsProps {
  calls: Call[];
  onAddCall: () => void;
}

const OpportunityCalls: React.FC<OpportunityCallsProps> = ({ calls, onAddCall }) => {
  return (
    <div className="relative p-4 bg-white rounded-md shadow-md">
      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-secondary absolute top-[-45px] right-0 w-10 h-10 flex items-center justify-center border border-gray-300 shadow-lg"
        onClick={onAddCall}
        tooltip="Add Call"
      />
      <DataTable value={calls} paginator rows={5} className="mt-4">
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
        <Column field="id" header="ID" sortable filter filterPlaceholder="Filter ID"></Column>
        <Column field="salesRep" header="Sales Rep" sortable filter filterPlaceholder="Filter Rep"></Column>
        <Column field="callDate" header="Call Date" sortable filter filterPlaceholder="Filter Date"></Column>
        <Column field="duration" header="Call Duration" sortable filter filterPlaceholder="Filter Duration"></Column>
        <Column field="outcome" header="Outcome" sortable filter filterPlaceholder="Filter Outcome"></Column>
        <Column field="note" header="Note" sortable filter filterPlaceholder="Filter Note"></Column>
      </DataTable>
    </div>
  );
};

export default OpportunityCalls;
