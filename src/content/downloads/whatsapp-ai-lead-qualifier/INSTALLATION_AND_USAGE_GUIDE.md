# Insparc Technology — WhatsApp AI Lead Qualifier & Booking Engine
## Official Production Deployment & Operations Manual

Thank you for your purchase. This guide provides step-by-step instructions to import, configure, test, and activate your automated WhatsApp lead qualification and calendar booking pipeline in n8n.

---

### 1. Requirements & Prerequisites

Before beginning, make sure you have:
1. **n8n Instance**: Either self-hosted (v1.40.0+ on Docker / VPS / Railway / Render) or official n8n Cloud.
2. **Meta WhatsApp Cloud API**: An active Meta Developer App with WhatsApp Cloud API configured.
   - Permanent System User Access Token
   - WhatsApp Phone Number ID
   - WhatsApp Business Account ID
3. **OpenAI API Key**: Funded with at least $5 credit. (Model used: `gpt-4o-mini`).
4. **Google Workspace Account**:
   - Google Sheets spreadsheet with columns: `Timestamp`, `Name`, `Phone`, `Service`, `Budget`, `Calendar_Booked`.
   - Google Calendar where bookings will be scheduled.

> [!WARNING]
> **API Key Security**: Never hardcode private API keys or tokens inside Code nodes or share workflow exports containing your credentials. Always use n8n's encrypted Credential Vault.

---

### 2. Step-by-Step Setup Guide

#### Step 1: Import the Workflow
1. Log into your n8n dashboard.
2. In the top right corner of the canvas, click the `...` menu and select **Import from File**.
3. Upload `whatsapp-ai-lead-qualifier.json`.

#### Step 2: Configure Credentials in n8n
Navigate to **Credentials** in the left sidebar and create:
- **OpenAI API**: Add your key under name `OpenAI Account`.
- **Meta WhatsApp Header Auth**: Header Name: `Authorization`, Header Value: `Bearer <YOUR_META_PERMANENT_TOKEN>`.
- **Google Calendar OAuth2**: Connect via standard Google sign-in.
- **Google Sheets OAuth2**: Connect via standard Google sign-in.

#### Step 3: Configure Business Variables
Click on the node titled **Set Business Variables** and replace:
- `business_name`: Your company name.
- `calendar_id`: `primary` (or your specific Google Calendar ID).
- `sheet_id`: The ID string from your Google Sheets URL (`https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`).

#### Step 4: Configure Meta Webhook
1. Open the **WhatsApp Webhook Listener** node in n8n.
2. Copy the **Production Webhook URL**.
3. In your **Meta App Dashboard**, go to **WhatsApp > Configuration**.
4. Paste the URL into **Callback URL** and enter your chosen Verify Token.
5. In **Webhook Fields**, subscribe to `messages`.

#### Step 5: Safe End-to-End Testing
1. In n8n, click **Test workflow**.
2. Send a WhatsApp message from your personal phone to your WhatsApp Business number:
   `"Hi! I want to enquire about automation services for my real estate firm."`
3. Watch the nodes illuminate in n8n:
   - Webhook receives payload.
   - AI extracts the requirement and formats the response.
   - Lead gets appended to Google Sheets.
   - Auto-reply arrives back on your phone within 2 seconds.
4. Toggle the workflow to **Active** (green switch in top right).

---

### 3. Troubleshooting Common Errors

| Error Symptom | Root Cause | Solution |
| :--- | :--- | :--- |
| **401 Unauthorized on Meta API** | Expired Temporary Token | Meta's 24-hour test token expired. Create a **System User** in Meta Business Manager and generate a **Permanent Token** with `whatsapp_business_messaging` permissions. |
| **OpenAI Rate Limit 429** | Insufficient API credit | Check your OpenAI Platform billing settings and add at least $5 prepaid balance. |
| **Webhook 502 / Cannot Connect** | Firewall / Localhost URL | Meta cannot reach `localhost`. Your n8n instance must be hosted on a public domain with valid HTTPS SSL (e.g. `n8n.yourdomain.com`). |

---

### 4. Support & Customization
If you need assistance customizing prompt prompts, connecting HubSpot/Salesforce, or setting up dedicated VPS hosting, contact the Insparc engineering team:
- Website: [Insparc Contact](https://insparc.in/contact)
- Email: support@insparc.in

