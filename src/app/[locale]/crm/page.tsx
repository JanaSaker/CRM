"use client";

import { useSearchParams } from "next/navigation";
import { use } from "react";
import DragAndDrop from "@/Components/DragAndDrop"; 
import OpportunityCard from "../brainspace/components/OpportunityCard";

export default function CRMPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = use(params);
  const { locale } = resolvedParams;

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const sections = [
    {
      id: "new",
      name: "New",
      tasks: [
        { id: "1", title: "Initial Contact", description: "Follow up with the lead" },
        { id: "2", title: "Schedule Meeting", description: "Set up a meeting with the team" },
      ],
    },
    {
      id: "qualified",
      name: "Qualified",
      tasks: [
        { id: "3", title: "Review Documents", description: "Check the client documents" },
      ],
    },
    {
      id: "proposition",
      name: "Proposition",
      tasks: [],
    },
    {
      id: "won",
      name: "Won",
      tasks: [
        { id: "4", title: "Finalize Deal", description: "Send the final agreement to the client" },
      ],
    },
    {
      id: "stage",
      name: "Stage",
      tasks: [],
    },
  ];

  if (!token) {
    return (
      <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
        <h1>Error: Missing Token</h1>
        <p>Please provide a valid token in the URL as a query parameter.</p>
        <p>Example: <code>?token=your-token-value</code></p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>CRM Page for Locale: {locale}</h1>
      <p>Token: {token}</p>
      <DragAndDrop initialSections={sections} />
      <OpportunityCard/>
    </div>
  );
}
