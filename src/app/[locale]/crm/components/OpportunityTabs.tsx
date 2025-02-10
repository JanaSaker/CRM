import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import OpportunityCalls from "./OpportunityCalls";

interface OpportunityTabsProps {
  activeIndex: number;
  onTabChange: (index: number) => void;
  calls: any[];
  onAddCall: () => void;
}

const OpportunityTabs: React.FC<OpportunityTabsProps> = ({ activeIndex, onTabChange, calls, onAddCall }) => {
  return (
    <TabView activeIndex={activeIndex} onTabChange={(e) => onTabChange(e.index)} className="mt-6">
      <TabPanel header="Calls">
        <OpportunityCalls calls={calls} onAddCall={onAddCall} />
      </TabPanel>
      <TabPanel header="Follow up">
        <div className="p-4 bg-white rounded-md shadow-md">Follow-up content here...</div>
      </TabPanel>
      <TabPanel header="Meetings">
        <div className="p-4 bg-white rounded-md shadow-md">Meetings content here...</div>
      </TabPanel>
      <TabPanel header="Notes">
        <div className="p-4 bg-white rounded-md shadow-md">Notes content here...</div>
      </TabPanel>
    </TabView>
  );
};

export default OpportunityTabs;
