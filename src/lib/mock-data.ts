export type Role = "applicant" | "officer" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  aadhaar?: string;
};

export type Scheme = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: "Solar" | "Wind" | "Biogas" | "EV" | "Energy Efficiency";
  description: string;
  maxSubsidy: number;
  eligibility: string[];
  documentsRequired: string[];
  launchedOn: string;
  status: "Active" | "Upcoming" | "Closed";
  beneficiaries: number;
  totalDisbursed: number;
};

export type ApplicationStatus =
  | "Draft"
  | "Submitted"
  | "Under Verification"
  | "Scrutiny"
  | "Approved"
  | "Rejected"
  | "Sanctioned"
  | "Disbursed";

export type WorkflowStep = {
  stage: string;
  actor: string;
  status: "pending" | "in_progress" | "approved" | "rejected";
  date?: string;
  remarks?: string;
};

export type Application = {
  id: string;
  schemeId: string;
  schemeName: string;
  applicantId: string;
  applicantName: string;
  submittedOn: string;
  status: ApplicationStatus;
  amount: number;
  location: string;
  capacity?: string;
  documents: { name: string; verified: boolean }[];
  workflow: WorkflowStep[];
  sanctionNo?: string;
};

export type Notification = {
  id: string;
  title: string;
  date: string;
  type: "Circular" | "Notification" | "Tender" | "Press Release";
  summary: string;
  fileSize?: string;
};

export type Faq = {
  q: string;
  a: string;
  category: string;
};

export const schemes: Scheme[] = [
  {
    id: "sch-001",
    slug: "rooftop-solar-subsidy",
    name: "Rooftop Solar Subsidy for Residential Consumers",
    shortName: "Rooftop Solar",
    category: "Solar",
    description:
      "Financial assistance for residential consumers installing grid-connected rooftop solar PV systems up to 10 kW capacity.",
    maxSubsidy: 78000,
    eligibility: [
      "Residential electricity consumer in Goa",
      "Own or occupy the premises with valid consent",
      "No prior subsidy availed under the scheme",
      "Installation through empanelled vendors",
    ],
    documentsRequired: [
      "Electricity bill (latest)",
      "Aadhaar card",
      "Proof of ownership / NOC",
      "Bank account details (cancelled cheque)",
      "Vendor quotation",
    ],
    launchedOn: "2024-04-01",
    status: "Active",
    beneficiaries: 1842,
    totalDisbursed: 124500000,
  },
  {
    id: "sch-002",
    slug: "solar-water-heater-subsidy",
    name: "Solar Water Heater Subsidy Scheme",
    shortName: "Solar Water Heater",
    category: "Solar",
    description:
      "Capital subsidy for installation of solar water heating systems in domestic and institutional premises.",
    maxSubsidy: 10000,
    eligibility: [
      "Goa resident (individual or institution)",
      "BIS-certified SWH system",
      "Minimum 100 LPD capacity",
    ],
    documentsRequired: [
      "Aadhaar card",
      "Address proof",
      "Purchase invoice",
      "Warranty certificate",
      "Installation photograph",
    ],
    launchedOn: "2023-10-15",
    status: "Active",
    beneficiaries: 763,
    totalDisbursed: 6800000,
  },
  {
    id: "sch-003",
    slug: "ev-charging-infrastructure",
    name: "EV Charging Infrastructure Incentive",
    shortName: "EV Charging",
    category: "EV",
    description:
      "Subsidy for establishment of public and private EV charging stations across Goa under the state EV policy.",
    maxSubsidy: 250000,
    eligibility: [
      "Registered business / society / individual",
      "Minimum 2 charging points",
      "Compliant with MoP guidelines",
    ],
    documentsRequired: [
      "Business registration certificate",
      "Site ownership / lease deed",
      "Equipment specifications",
      "Electrical safety compliance",
      "Project report",
    ],
    launchedOn: "2024-01-20",
    status: "Active",
    beneficiaries: 128,
    totalDisbursed: 28500000,
  },
  {
    id: "sch-004",
    slug: "biogas-plant-subsidy",
    name: "Family-type Biogas Plant Subsidy",
    shortName: "Biogas Plant",
    category: "Biogas",
    description:
      "Central Financial Assistance for setting up family-type biogas plants (1-25 cubic metre capacity) for rural households.",
    maxSubsidy: 17000,
    eligibility: [
      "Rural household",
      "Availability of 2-3 heads of cattle",
      "Adequate space and water supply",
    ],
    documentsRequired: [
      "Aadhaar card",
      "Land document",
      "Photograph of installation site",
      "Bank details",
    ],
    launchedOn: "2022-06-10",
    status: "Active",
    beneficiaries: 342,
    totalDisbursed: 5200000,
  },
  {
    id: "sch-005",
    slug: "solar-pump-subsidy",
    name: "Solar Pump Scheme for Farmers (PM-KUSUM)",
    shortName: "Solar Pump",
    category: "Solar",
    description:
      "Subsidy for standalone solar agricultural pumps (1-10 HP) under PM-KUSUM Component B for farmers.",
    maxSubsidy: 180000,
    eligibility: [
      "Registered farmer in Goa",
      "Minimum landholding as per scheme guidelines",
      "Non-electrified fields preferred",
    ],
    documentsRequired: [
      "Farmer ID",
      "Land records (7/12 extract)",
      "Aadhaar",
      "Bank details",
      "Water source proof",
    ],
    launchedOn: "2023-03-15",
    status: "Active",
    beneficiaries: 217,
    totalDisbursed: 32400000,
  },
  {
    id: "sch-006",
    slug: "led-distribution-scheme",
    name: "Energy-Efficient LED Distribution",
    shortName: "LED Scheme",
    category: "Energy Efficiency",
    description:
      "Distribution of BEE 5-star LED bulbs at subsidised rates to domestic consumers in Goa.",
    maxSubsidy: 0,
    eligibility: ["Domestic electricity consumer in Goa"],
    documentsRequired: ["Electricity bill", "Aadhaar"],
    launchedOn: "2024-08-01",
    status: "Upcoming",
    beneficiaries: 0,
    totalDisbursed: 0,
  },
];

export const users: User[] = [
  {
    id: "usr-101",
    name: "Aarav Naik",
    email: "aarav.naik@example.com",
    role: "applicant",
    phone: "+91 98200 12345",
    aadhaar: "XXXX-XXXX-4821",
  },
  {
    id: "usr-102",
    name: "Shilpa Kamat",
    email: "shilpa.kamat@example.com",
    role: "applicant",
    phone: "+91 98200 67891",
  },
  {
    id: "usr-201",
    name: "Ramakant Desai",
    email: "r.desai@dnre.goa.gov.in",
    role: "officer",
  },
  {
    id: "usr-202",
    name: "Nandini Shetye",
    email: "n.shetye@dnre.goa.gov.in",
    role: "officer",
  },
  {
    id: "usr-301",
    name: "Dr. Prakash Velip",
    email: "dir-nre.goa@gov.in",
    role: "admin",
  },
];

export const applications: Application[] = [
  {
    id: "APP-2025-0417",
    schemeId: "sch-001",
    schemeName: "Rooftop Solar Subsidy for Residential Consumers",
    applicantId: "usr-101",
    applicantName: "Aarav Naik",
    submittedOn: "2026-03-18",
    status: "Sanctioned",
    amount: 78000,
    location: "Porvorim, North Goa",
    capacity: "5 kW",
    documents: [
      { name: "Electricity bill.pdf", verified: true },
      { name: "Aadhaar.pdf", verified: true },
      { name: "Ownership proof.pdf", verified: true },
      { name: "Bank details.pdf", verified: true },
      { name: "Vendor quotation.pdf", verified: true },
    ],
    workflow: [
      { stage: "Submitted", actor: "Aarav Naik", status: "approved", date: "2026-03-18" },
      { stage: "Document Verification", actor: "Nandini Shetye", status: "approved", date: "2026-03-22", remarks: "All documents in order" },
      { stage: "Site Inspection", actor: "Field Officer", status: "approved", date: "2026-03-29", remarks: "Installation verified" },
      { stage: "Scrutiny", actor: "Ramakant Desai", status: "approved", date: "2026-04-05" },
      { stage: "Sanction", actor: "Director DNRE", status: "approved", date: "2026-04-12" },
      { stage: "Disbursement", actor: "PFMS", status: "in_progress" },
    ],
    sanctionNo: "DNRE/RTS/2026/0417",
  },
  {
    id: "APP-2025-0518",
    schemeId: "sch-003",
    schemeName: "EV Charging Infrastructure Incentive",
    applicantId: "usr-102",
    applicantName: "Shilpa Kamat",
    submittedOn: "2026-04-02",
    status: "Under Verification",
    amount: 250000,
    location: "Panaji",
    capacity: "4 charging points (22 kW each)",
    documents: [
      { name: "Business registration.pdf", verified: true },
      { name: "Lease deed.pdf", verified: true },
      { name: "Equipment specs.pdf", verified: false },
      { name: "Safety compliance.pdf", verified: false },
      { name: "Project report.pdf", verified: false },
    ],
    workflow: [
      { stage: "Submitted", actor: "Shilpa Kamat", status: "approved", date: "2026-04-02" },
      { stage: "Document Verification", actor: "Nandini Shetye", status: "in_progress" },
      { stage: "Site Inspection", actor: "Field Officer", status: "pending" },
      { stage: "Scrutiny", actor: "Ramakant Desai", status: "pending" },
      { stage: "Sanction", actor: "Director DNRE", status: "pending" },
      { stage: "Disbursement", actor: "PFMS", status: "pending" },
    ],
  },
  {
    id: "APP-2025-0601",
    schemeId: "sch-005",
    schemeName: "Solar Pump Scheme for Farmers (PM-KUSUM)",
    applicantId: "usr-101",
    applicantName: "Aarav Naik",
    submittedOn: "2026-04-15",
    status: "Submitted",
    amount: 180000,
    location: "Quepem, South Goa",
    capacity: "5 HP AC pump",
    documents: [
      { name: "Farmer ID.pdf", verified: false },
      { name: "7-12 extract.pdf", verified: false },
      { name: "Aadhaar.pdf", verified: false },
    ],
    workflow: [
      { stage: "Submitted", actor: "Aarav Naik", status: "approved", date: "2026-04-15" },
      { stage: "Document Verification", actor: "Nandini Shetye", status: "pending" },
      { stage: "Site Inspection", actor: "Field Officer", status: "pending" },
      { stage: "Scrutiny", actor: "Ramakant Desai", status: "pending" },
      { stage: "Sanction", actor: "Director DNRE", status: "pending" },
      { stage: "Disbursement", actor: "PFMS", status: "pending" },
    ],
  },
  {
    id: "APP-2025-0622",
    schemeId: "sch-002",
    schemeName: "Solar Water Heater Subsidy Scheme",
    applicantId: "usr-102",
    applicantName: "Shilpa Kamat",
    submittedOn: "2026-04-20",
    status: "Rejected",
    amount: 10000,
    location: "Margao",
    documents: [
      { name: "Aadhaar.pdf", verified: true },
      { name: "Purchase invoice.pdf", verified: false },
    ],
    workflow: [
      { stage: "Submitted", actor: "Shilpa Kamat", status: "approved", date: "2026-04-20" },
      { stage: "Document Verification", actor: "Nandini Shetye", status: "rejected", date: "2026-04-21", remarks: "Invoice does not match BIS-certified model" },
    ],
  },
  {
    id: "APP-2025-0301",
    schemeId: "sch-001",
    schemeName: "Rooftop Solar Subsidy for Residential Consumers",
    applicantId: "usr-101",
    applicantName: "Aarav Naik",
    submittedOn: "2026-02-10",
    status: "Disbursed",
    amount: 58500,
    location: "Mapusa",
    capacity: "3 kW",
    documents: [
      { name: "Electricity bill.pdf", verified: true },
      { name: "Aadhaar.pdf", verified: true },
      { name: "Ownership proof.pdf", verified: true },
    ],
    workflow: [
      { stage: "Submitted", actor: "Aarav Naik", status: "approved", date: "2026-02-10" },
      { stage: "Document Verification", actor: "Nandini Shetye", status: "approved", date: "2026-02-14" },
      { stage: "Site Inspection", actor: "Field Officer", status: "approved", date: "2026-02-20" },
      { stage: "Scrutiny", actor: "Ramakant Desai", status: "approved", date: "2026-02-28" },
      { stage: "Sanction", actor: "Director DNRE", status: "approved", date: "2026-03-05" },
      { stage: "Disbursement", actor: "PFMS", status: "approved", date: "2026-03-12" },
    ],
    sanctionNo: "DNRE/RTS/2026/0301",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "Revised guidelines for Rooftop Solar Subsidy Scheme 2026-27",
    date: "2026-04-18",
    type: "Circular",
    summary:
      "Revised CFA rates and simplified document requirements issued under the Rooftop Solar Programme Phase-II.",
    fileSize: "412 KB",
  },
  {
    id: "notif-002",
    title: "Tender for empanelment of solar installers for FY 2026-27",
    date: "2026-04-10",
    type: "Tender",
    summary:
      "The Department invites sealed bids for empanelment of solar PV installers. Last date for submission: 15 May 2026.",
    fileSize: "1.2 MB",
  },
  {
    id: "notif-003",
    title: "Press Release: Goa crosses 150 MW rooftop solar milestone",
    date: "2026-04-02",
    type: "Press Release",
    summary:
      "State reaches 150 MW cumulative rooftop solar installed capacity under the centrally-sponsored scheme.",
  },
  {
    id: "notif-004",
    title: "Notification regarding EV Policy implementation committee",
    date: "2026-03-28",
    type: "Notification",
    summary:
      "Constitution of state-level implementation committee for Goa EV Policy 2021.",
    fileSize: "186 KB",
  },
  {
    id: "notif-005",
    title: "Circular: Extension of subsidy claim deadline for FY 2025-26",
    date: "2026-03-15",
    type: "Circular",
    summary:
      "Deadline for submission of pending subsidy claims extended to 30 June 2026.",
    fileSize: "98 KB",
  },
  {
    id: "notif-006",
    title: "Tender for supply & installation of LED streetlights",
    date: "2026-03-05",
    type: "Tender",
    summary:
      "Supply, installation, and 5-year maintenance of smart LED streetlights in select panchayats.",
    fileSize: "2.8 MB",
  },
];

export const faqs: Faq[] = [
  {
    category: "General",
    q: "Who is eligible to apply for DNRE subsidy schemes?",
    a: "Eligibility varies by scheme. Most residential schemes require you to be a Goa resident with a valid electricity connection. Please refer to the specific scheme page for detailed eligibility criteria.",
  },
  {
    category: "General",
    q: "How do I apply for a subsidy scheme?",
    a: "Click on the scheme you are interested in, review the eligibility and documents required, then click 'Apply Now' to log in to the citizen portal and submit your application online.",
  },
  {
    category: "Application",
    q: "What documents are typically required?",
    a: "Aadhaar card, proof of address, electricity bill, bank account details, and scheme-specific documents. The portal will list the exact documents required during the application process.",
  },
  {
    category: "Application",
    q: "Can I save a draft and submit later?",
    a: "Yes. The portal auto-saves your application as a draft. You can return anytime to complete and submit.",
  },
  {
    category: "Disbursement",
    q: "How long does subsidy disbursement take?",
    a: "After sanction, disbursement typically happens within 15-30 working days via DBT to your registered bank account.",
  },
  {
    category: "Disbursement",
    q: "How will I receive the subsidy amount?",
    a: "Subsidies are disbursed through DBT (Direct Benefit Transfer) using the PFMS platform directly to the bank account linked with your Aadhaar.",
  },
  {
    category: "Technical",
    q: "Which browsers are supported?",
    a: "The portal supports latest versions of Chrome, Firefox, Edge, and Safari. For best experience, keep your browser updated.",
  },
  {
    category: "Technical",
    q: "Whom do I contact for technical assistance?",
    a: "Email helpdesk@dnre.goa.gov.in or call the helpline (0832-XXXXXXX) during working hours (10 AM - 5 PM, Mon-Fri).",
  },
];

export function getScheme(slug: string) {
  return schemes.find((s) => s.slug === slug);
}

export function getApplication(id: string) {
  return applications.find((a) => a.id === id);
}

export function getUser(id: string) {
  return users.find((u) => u.id === id);
}

export function statsForRole(role: Role, userId?: string) {
  if (role === "applicant" && userId) {
    const mine = applications.filter((a) => a.applicantId === userId);
    return {
      total: mine.length,
      pending: mine.filter((a) => !["Disbursed", "Rejected"].includes(a.status)).length,
      approved: mine.filter((a) => ["Sanctioned", "Disbursed"].includes(a.status)).length,
      totalAmount: mine
        .filter((a) => ["Sanctioned", "Disbursed"].includes(a.status))
        .reduce((sum, a) => sum + a.amount, 0),
    };
  }
  if (role === "officer") {
    return {
      queue: applications.filter((a) =>
        ["Submitted", "Under Verification", "Scrutiny"].includes(a.status)
      ).length,
      approvedToday: 3,
      flagged: 1,
      overdue: 2,
    };
  }
  return {
    totalApplications: applications.length,
    activeSchemes: schemes.filter((s) => s.status === "Active").length,
    totalDisbursed: schemes.reduce((s, x) => s + x.totalDisbursed, 0),
    beneficiaries: schemes.reduce((s, x) => s + x.beneficiaries, 0),
  };
}
