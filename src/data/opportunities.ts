export interface OpportunityData {
    name: string;
    expectedRevenue: string;
    probability: number;
    contact: string;
    email: string;
    phone?: string;
    salesperson: string;
    expectedClosing: number;
    stage: string;
  }
  
  export const opportunities: OpportunityData[] = [
    {
      name: "Zainab Karaki's Opportunity",
      expectedRevenue: "0.00 J-J",
      probability: 50.0,
      contact: "Zainab Karaki",
      email: "zainabkaraki@gmail.com",
      phone: "",
      salesperson: "Zainab Karaki",
      expectedClosing: 3,
      stage: "Proposition",
    },
    {
      name: "John Doe's Opportunity",
      expectedRevenue: "5,000 USD",
      probability: 80.0,
      contact: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      salesperson: "Alice Johnson",
      expectedClosing: 2,
      stage: "Qualified",
    },
  ];
  