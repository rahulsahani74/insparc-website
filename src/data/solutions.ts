export type BusinessSolution = {slug:string; title:string; category:string; summary:string; features:string[]; steps:string[]};
export const solutions: BusinessSolution[] = [
  {
    "slug": "whatsapp-ai-lead-qualifier",
    "title": "Customer Enquiries & Appointment Requests",
    "category": "Customer enquiries",
    "summary": "Help interested customers get a useful reply, share their requirements and request the right next step.",
    "features": [
      "A clear first response",
      "The details needed for a follow-up",
      "Appointment-request coordination",
      "Handoff to a person when needed"
    ],
    "steps": [
      "An enquiry arrives",
      "The customer shares their needs",
      "The right next step is prepared",
      "Your team reviews or follows up"
    ]
  },
  {
    "slug": "crm-enrichment-followup-system",
    "title": "Sales Follow-up & Customer Records",
    "category": "Sales follow-up",
    "summary": "Keep enquiry details, conversation history and next actions organised so the sales team can follow through.",
    "features": [
      "Consistent customer details",
      "Clear follow-up responsibilities",
      "Relevant draft responses",
      "A visible record of next actions"
    ],
    "steps": [
      "Collect the enquiry",
      "Check the available details",
      "Prepare a relevant follow-up",
      "Assign the next action"
    ]
  },
  {
    "slug": "rag-support-knowledge-agent",
    "title": "Business Information & Customer Support",
    "category": "Customer support",
    "summary": "Make approved information easier to find and repeated customer questions easier to answer.",
    "features": [
      "An organised set of common questions",
      "Answers based on agreed information",
      "A review path for uncertain requests",
      "Clear handoff to your team"
    ],
    "steps": [
      "A customer asks a question",
      "Relevant business information is found",
      "A useful response is prepared",
      "Uncertain cases reach your team"
    ]
  },
  {
    "slug": "ecommerce-abandoned-cart-whatsapp",
    "title": "Customer Reminders & Repeat Business",
    "category": "Repeat business",
    "summary": "Plan relevant reminders and follow-ups that help customers return to an enquiry or unfinished order.",
    "features": [
      "A considered reminder journey",
      "Relevant customer context",
      "Respectful contact preferences",
      "Review of available responses"
    ],
    "steps": [
      "Identify an unfinished enquiry",
      "Check whether a reminder is appropriate",
      "Prepare an approved message",
      "Review the response and next step"
    ]
  }
];
