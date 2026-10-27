export type ProjectStatus = "placeholder" | "live";
export type Project = {slug:string;title:string;category:string;summary:string;problem:string;solution:string;workflowSteps:string[];tools:string[];images:string[];videoUrl?:string;results?:string;status:ProjectStatus};
export const projects: Project[] = [
  {
    "slug": "whatsapp-ai-chatbot",
    "title": "WhatsApp Customer Enquiries",
    "category": "Customer enquiries",
    "summary": "Help customers share their needs, receive a useful response and request an appointment.",
    "workflowSteps": [
      "Receive a customer message",
      "Understand the request",
      "Prepare a useful reply",
      "Hand the next step to the right person"
    ],
    "problem": "Repeated enquiries and unclear next steps can leave customers waiting and teams repeating the same work.",
    "solution": "Agree the process, prepare the right response and keep your team involved at the important review points.",
    "images": [
      "/projects/whatsapp-ai-chatbot/workflow.svg"
    ],
    "tools": [],
    "status": "placeholder"
  },
  {
    "slug": "automated-email-sender",
    "title": "Email Follow-up & Customer Updates",
    "category": "Customer communication",
    "summary": "A considered follow-up journey from the first enquiry to the next useful conversation.",
    "workflowSteps": [
      "Receive the enquiry",
      "Prepare a relevant reply",
      "Review and send the message",
      "Plan the next follow-up"
    ],
    "problem": "Repeated enquiries and unclear next steps can leave customers waiting and teams repeating the same work.",
    "solution": "Agree the process, prepare the right response and keep your team involved at the important review points.",
    "images": [
      "/projects/automated-email-sender/workflow.svg"
    ],
    "tools": [],
    "status": "placeholder"
  },
  {
    "slug": "lead-capture-ai-followup",
    "title": "Lead Capture & Follow-up",
    "category": "Sales coordination",
    "summary": "Keep new enquiries organised and make the next action clear to the sales team.",
    "workflowSteps": [
      "Collect new enquiries",
      "Check the customer details",
      "Prepare the next step",
      "Assign a follow-up owner"
    ],
    "problem": "Repeated enquiries and unclear next steps can leave customers waiting and teams repeating the same work.",
    "solution": "Agree the process, prepare the right response and keep your team involved at the important review points.",
    "images": [
      "/projects/lead-capture-ai-followup/workflow.svg"
    ],
    "tools": [],
    "status": "placeholder"
  },
  {
    "slug": "knowledge-support",
    "title": "Customer & Team Knowledge Support",
    "category": "Customer support",
    "summary": "Help people find approved information and direct uncertain questions to the team.",
    "workflowSteps": [
      "Receive the question",
      "Find the relevant information",
      "Prepare a clear answer",
      "Refer uncertain requests to a person"
    ],
    "problem": "Repeated enquiries and unclear next steps can leave customers waiting and teams repeating the same work.",
    "solution": "Agree the process, prepare the right response and keep your team involved at the important review points.",
    "images": [
      "/projects/knowledge-support/workflow.svg"
    ],
    "tools": [],
    "status": "placeholder"
  }
];
