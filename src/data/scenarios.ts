/**
 * Workflow Theater scenarios — Insparc Technologies.
 * Each scenario is labelled "Demo simulation" and represents a common automation.
 * Data is purely static — no network requests, no real client data.
 *
 * ADDING A SCENARIO:
 * 1. Give each node a unique id string.
 * 2. Lay out nodes on a rough grid (x, y in pixels, relative to the Theater SVG canvas).
 * 3. Define edges as [from, to] pairs.
 * 4. Define steps in execution order; each step references a nodeId.
 */

export type NodeKind = "trigger" | "ai" | "tool" | "logic" | "output";

export type WFNode = {
  id: string;
  label: string;
  kind: NodeKind;
  /** lucide-react icon name */
  icon: string;
  x: number;
  y: number;
};

export type WFStep = {
  nodeId: string;
  durationMs: number;
  log: string;
  payload?: string;
};

export type Scenario = {
  id: string;
  title: string;
  subtitle: string;
  nodes: WFNode[];
  edges: [from: string, to: string][];
  steps: WFStep[];
};

export const scenarios: Scenario[] = [
  {
    "id": "whatsapp-ai-chatbot",
    "title": "Customer Enquiries",
    "subtitle": "Demo simulation",
    "nodes": [
      {
        "id": "step-0",
        "label": "Message received",
        "kind": "trigger",
        "icon": "MessageCircle",
        "x": 40,
        "y": 130
      },
      {
        "id": "step-1",
        "label": "Understand request",
        "kind": "logic",
        "icon": "Search",
        "x": 290,
        "y": 130
      },
      {
        "id": "step-2",
        "label": "Prepare reply",
        "kind": "logic",
        "icon": "FileText",
        "x": 540,
        "y": 130
      },
      {
        "id": "step-3",
        "label": "Team handoff",
        "kind": "output",
        "icon": "Check",
        "x": 790,
        "y": 130
      }
    ],
    "edges": [
      [
        "step-0",
        "step-1"
      ],
      [
        "step-1",
        "step-2"
      ],
      [
        "step-2",
        "step-3"
      ]
    ],
    "steps": [
      {
        "nodeId": "step-0",
        "durationMs": 1800,
        "log": "Message received — illustrative step 1 of 4."
      },
      {
        "nodeId": "step-1",
        "durationMs": 1800,
        "log": "Understand request — illustrative step 2 of 4."
      },
      {
        "nodeId": "step-2",
        "durationMs": 1800,
        "log": "Prepare reply — illustrative step 3 of 4."
      },
      {
        "nodeId": "step-3",
        "durationMs": 1800,
        "log": "Team handoff — illustrative step 4 of 4."
      }
    ]
  },
  {
    "id": "lead-capture-followup",
    "title": "Lead Follow-up",
    "subtitle": "Demo simulation",
    "nodes": [
      {
        "id": "step-0",
        "label": "Enquiry received",
        "kind": "trigger",
        "icon": "MessageCircle",
        "x": 40,
        "y": 130
      },
      {
        "id": "step-1",
        "label": "Check details",
        "kind": "logic",
        "icon": "Search",
        "x": 290,
        "y": 130
      },
      {
        "id": "step-2",
        "label": "Assign a person",
        "kind": "logic",
        "icon": "FileText",
        "x": 540,
        "y": 130
      },
      {
        "id": "step-3",
        "label": "Plan follow-up",
        "kind": "output",
        "icon": "Check",
        "x": 790,
        "y": 130
      }
    ],
    "edges": [
      [
        "step-0",
        "step-1"
      ],
      [
        "step-1",
        "step-2"
      ],
      [
        "step-2",
        "step-3"
      ]
    ],
    "steps": [
      {
        "nodeId": "step-0",
        "durationMs": 1800,
        "log": "Enquiry received — illustrative step 1 of 4."
      },
      {
        "nodeId": "step-1",
        "durationMs": 1800,
        "log": "Check details — illustrative step 2 of 4."
      },
      {
        "nodeId": "step-2",
        "durationMs": 1800,
        "log": "Assign a person — illustrative step 3 of 4."
      },
      {
        "nodeId": "step-3",
        "durationMs": 1800,
        "log": "Plan follow-up — illustrative step 4 of 4."
      }
    ]
  },
  {
    "id": "automated-email-sequence",
    "title": "Customer Updates",
    "subtitle": "Demo simulation",
    "nodes": [
      {
        "id": "step-0",
        "label": "Enquiry received",
        "kind": "trigger",
        "icon": "MessageCircle",
        "x": 40,
        "y": 130
      },
      {
        "id": "step-1",
        "label": "Prepare update",
        "kind": "logic",
        "icon": "Search",
        "x": 290,
        "y": 130
      },
      {
        "id": "step-2",
        "label": "Review message",
        "kind": "logic",
        "icon": "FileText",
        "x": 540,
        "y": 130
      },
      {
        "id": "step-3",
        "label": "Send and follow up",
        "kind": "output",
        "icon": "Check",
        "x": 790,
        "y": 130
      }
    ],
    "edges": [
      [
        "step-0",
        "step-1"
      ],
      [
        "step-1",
        "step-2"
      ],
      [
        "step-2",
        "step-3"
      ]
    ],
    "steps": [
      {
        "nodeId": "step-0",
        "durationMs": 1800,
        "log": "Enquiry received — illustrative step 1 of 4."
      },
      {
        "nodeId": "step-1",
        "durationMs": 1800,
        "log": "Prepare update — illustrative step 2 of 4."
      },
      {
        "nodeId": "step-2",
        "durationMs": 1800,
        "log": "Review message — illustrative step 3 of 4."
      },
      {
        "nodeId": "step-3",
        "durationMs": 1800,
        "log": "Send and follow up — illustrative step 4 of 4."
      }
    ]
  },
  {
    "id": "rag-knowledge-agent",
    "title": "Business Information",
    "subtitle": "Demo simulation",
    "nodes": [
      {
        "id": "step-0",
        "label": "Question received",
        "kind": "trigger",
        "icon": "MessageCircle",
        "x": 40,
        "y": 130
      },
      {
        "id": "step-1",
        "label": "Find agreed notes",
        "kind": "logic",
        "icon": "Search",
        "x": 290,
        "y": 130
      },
      {
        "id": "step-2",
        "label": "Prepare response",
        "kind": "logic",
        "icon": "FileText",
        "x": 540,
        "y": 130
      },
      {
        "id": "step-3",
        "label": "Review or hand off",
        "kind": "output",
        "icon": "Check",
        "x": 790,
        "y": 130
      }
    ],
    "edges": [
      [
        "step-0",
        "step-1"
      ],
      [
        "step-1",
        "step-2"
      ],
      [
        "step-2",
        "step-3"
      ]
    ],
    "steps": [
      {
        "nodeId": "step-0",
        "durationMs": 1800,
        "log": "Question received — illustrative step 1 of 4."
      },
      {
        "nodeId": "step-1",
        "durationMs": 1800,
        "log": "Find agreed notes — illustrative step 2 of 4."
      },
      {
        "nodeId": "step-2",
        "durationMs": 1800,
        "log": "Prepare response — illustrative step 3 of 4."
      },
      {
        "nodeId": "step-3",
        "durationMs": 1800,
        "log": "Review or hand off — illustrative step 4 of 4."
      }
    ]
  },
  {
    "id": "multi-agent-research",
    "title": "Research & Preparation",
    "subtitle": "Demo simulation",
    "nodes": [
      {
        "id": "step-0",
        "label": "Agree the question",
        "kind": "trigger",
        "icon": "MessageCircle",
        "x": 40,
        "y": 130
      },
      {
        "id": "step-1",
        "label": "Gather information",
        "kind": "logic",
        "icon": "Search",
        "x": 290,
        "y": 130
      },
      {
        "id": "step-2",
        "label": "Compare findings",
        "kind": "logic",
        "icon": "FileText",
        "x": 540,
        "y": 130
      },
      {
        "id": "step-3",
        "label": "Review the brief",
        "kind": "output",
        "icon": "Check",
        "x": 790,
        "y": 130
      }
    ],
    "edges": [
      [
        "step-0",
        "step-1"
      ],
      [
        "step-1",
        "step-2"
      ],
      [
        "step-2",
        "step-3"
      ]
    ],
    "steps": [
      {
        "nodeId": "step-0",
        "durationMs": 1800,
        "log": "Agree the question — illustrative step 1 of 4."
      },
      {
        "nodeId": "step-1",
        "durationMs": 1800,
        "log": "Gather information — illustrative step 2 of 4."
      },
      {
        "nodeId": "step-2",
        "durationMs": 1800,
        "log": "Compare findings — illustrative step 3 of 4."
      },
      {
        "nodeId": "step-3",
        "durationMs": 1800,
        "log": "Review the brief — illustrative step 4 of 4."
      }
    ]
  }
];
