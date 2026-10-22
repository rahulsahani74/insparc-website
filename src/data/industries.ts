export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  painPoints: string[];
  solutions: string[];
  sampleFlow: string[];
};

export const industries: Industry[] = [
  {
    slug: "clinics-healthcare",
    name: "Clinics & Healthcare",
    tagline: "Automated Patient Scheduling & Prescription Reminders",
    summary:
      "Medical clinics and dental practices lose up to 30% of appointment slots to no-shows and staff phone tag. Insparc automates patient booking and follow-up on WhatsApp.",
    painPoints: [
      "Staff overwhelmed taking appointment phone calls during consultation hours",
      "High no-show rates due to lack of timely WhatsApp reminders",
      "Manual collection of patient intake details on paper forms",
    ],
    solutions: [
      "24/7 WhatsApp AI receptionist that books slots directly into doctor's calendar",
      "Automated appointment confirmation with Google Maps location and prep instructions",
      "Automated reminder messages 24 hours and 2 hours prior to consultation",
    ],
    sampleFlow: [
      "Patient texts clinic WhatsApp",
      "AI checks doctor's real-time calendar availability",
      "Patient confirms desired slot",
      "Calendar invite and CRM record created",
      "Reminders scheduled automatically",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate Agencies",
    tagline: "Instant Lead Capture & Property Brochure Delivery",
    summary:
      "Real estate buyers contact multiple listings at once. The first agent to reply with relevant project details wins the deal. We automate lead qualification in under 60 seconds.",
    painPoints: [
      "Ad leads from Meta & Google sitting cold for hours before sales calls",
      "Repetitive questions about price, square footage, and possession dates",
      "Agents wasting time with unqualified buyers with mismatched budgets",
    ],
    solutions: [
      "Instant WhatsApp brochure delivery triggered as soon as an ad lead submits",
      "AI qualification bot that filters budget, location, and ready-to-move criteria",
      "Hot leads auto-routed to top-performing sales agents via priority alerts",
    ],
    sampleFlow: [
      "Facebook Lead Ad submitted",
      "n8n webhook triggers instant WhatsApp greeting with project PDF",
      "AI asks 3 quick qualification questions",
      "High-intent lead details pushed to CRM",
      "Sales manager notified to call within 5 minutes",
    ],
  },
  {
    slug: "coaching-education",
    name: "Coaching & EdTech",
    tagline: "Student Admissions & Webinar Attendance Automation",
    summary:
      "Coaching institutes and online course creators struggle to convert webinar registrants into paid students. We automate attendance reminders and post-webinar follow-ups.",
    painPoints: [
      "Low webinar attendance rates without multi-channel notifications",
      "Manual phone calls to verify course eligibility and student background",
      "Drop-offs during fee payment and batch enrollment",
    ],
    solutions: [
      "Multi-step WhatsApp reminder sequences with join links and calendar invites",
      "AI admissions counselor answering syllabus, fee, and batch timing questions",
      "Payment link generation with automated receipt delivery",
    ],
    sampleFlow: [
      "Webinar registration form submitted",
      "WhatsApp confirmation sent with calendar invite",
      "Automated reminder countdown at T-1 day, T-1 hour, T-10 min",
      "Post-webinar recording & offer link sent automatically",
      "Unpaid leads enrolled into AI follow-up branch",
    ],
  },
  {
    slug: "ecommerce-retail",
    name: "E-Commerce & D2C",
    tagline: "Abandoned Cart Recovery & Order Tracking",
    summary:
      "Indian D2C brands experience high cart abandonment and Return-To-Origin (RTO) rates. Insparc builds automated WhatsApp order verification and re-engagement flows.",
    painPoints: [
      "Cart abandonment exceeding 65% on checkout",
      "High Cash-on-Delivery (COD) return and cancellation losses",
      "Repetitive 'Where is my order?' support tickets clogging team inboxes",
    ],
    solutions: [
      "WhatsApp cart recovery sequence with limited-time discount incentive",
      "Automated COD order verification message before dispatch",
      "Real-time courier tracking updates sent directly to buyer's WhatsApp",
    ],
    sampleFlow: [
      "Shopify checkout abandoned",
      "30-minute delay timer checks if purchase completed",
      "If unpaid, personalized WhatsApp sent with direct recovery link",
      "On purchase, shipping updates pushed from Shiprocket / Delhivery",
    ],
  },
];

