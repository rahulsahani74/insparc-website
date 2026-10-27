# Enterprise RAG Support Agent — Deployment Manual
## Zero-Hallucination Retrieval Augmented Generation in n8n

### Architecture Overview
This workflow retrieves relevant semantic chunks from Qdrant vector database based on user inquiries, builds a grounded context window, and feeds it into OpenAI with zero-hallucination guardrails.

### Quick Setup
1. **Create Free Qdrant Cloud Cluster**: Sign up at `cloud.qdrant.io` and create a free 1GB cluster.
2. **Generate API Key**: Save the Qdrant API key and cluster URL in n8n credentials.
3. **Embed Your Documents**: Use the included `sample-knowledge-base.md` or upload your company PDFs into Qdrant collection `insparc_knowledge_base`.
4. **Test Query**: POST `{ "query": "What is Insparc's refund policy on digital workflows?" }` to your webhook URL.

