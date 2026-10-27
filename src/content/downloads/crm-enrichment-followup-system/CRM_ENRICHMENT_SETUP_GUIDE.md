# Autonomous Lead Research & CRM Follow-up System
## Deployment & Configuration Manual

This workflow automatically enriches form leads by crawling their business website, scoring their intent with OpenAI GPT-4o, creating contacts in HubSpot, and sending consultative emails via Resend.

---

### Prerequisites
1. **n8n v1.40+** (Self-hosted or Cloud).
2. **OpenAI API Key** (requires access to `gpt-4o`).
3. **HubSpot Free CRM** (or Airtable):
   - In HubSpot, navigate to **Settings > Integrations > Private Apps** and create an app with `crm.objects.contacts.write`.
4. **Resend / SMTP Provider**:
   - Resend API key configured as an SMTP credential (`smtp.resend.com:465`).

---

### Step-by-Step Setup
1. **Import Workflow**: Drag & drop `crm-enrichment-followup.json` into n8n.
2. **Add Credentials**:
   - Under Credentials in n8n, create an OpenAI API credential and a HubSpot API credential.
3. **Set Sender Address**:
   - In the **Dispatch Tailored Email** node, update `fromEmail` to your domain address (e.g. `alex@yourdomain.com`).
4. **Connect Form**:
   - Copy the Webhook URL and configure your contact form to post `{ name, email, company, message }`.
5. **Activate**:
   - Test with your own work email and verify that the contact is created in HubSpot and the research summary is attached!

