# 🧠 AI-Powered Todo Summarizer

A full-stack application to manage and summarize your todos using AI. Users can add, update, and complete tasks — then instantly generate a smart summary of all pending todos powered by **GPT-4o-mini**. This summary is also sent to a designated **Slack channel** for seamless team communication.

---

## 📁 Project Structure

- **Frontend/**: Contains all React components, UI logic, and API integrations.
- **Backend/**: Contains the Express server, API routes for todos and summarization, OpenAI integration, and Slack webhook logic.

---

## 🖥️ Frontend Setup

📂 Navigate to the `Frontend/` directory to set up the React app.

### ⚙️ Run Locally:

```bash
cd Frontend
npm install
npm run dev

## 🛠 Backend Setup

📁 Navigate to the Backend/ directory to set up the Node.js server.

### ⚙️ Steps to Run Locally:

```bash
cd Backend
npm install
npm start
```

Make sure your database (Supabase) is correctly configured before starting the server.

### 🔑 Environment Variables

Create a **`.env`** file in the `Backend/` directory with the following variables:

```env
PORT=5000
DATABASE_URL=your_supabase_postgres_connection_string
OPENAI_API_KEY=your_openai_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

- `DATABASE_URL` — Get this from your Supabase project's settings.

- `OPENAI_API_KEY` — Obtain from your OpenAI API Keys.

- `SLACK_WEBHOOK_URL` — Create one in Slack under Incoming Webhooks.

## ✨ Features

 Features
📝 Create, edit, and delete todos

✅ Mark tasks as completed

🧠 Generate a smart summary of pending todos with GPT-4o-mini

📩 Automatically send summaries to a Slack channel

💅 Built with React, Tailwind CSS, and Node.js

🗃️ Persistent storage with PostgreSQL via Supabase


## 🔮 AI Summarization Logic

The app sends all pending todos to GPT-4o-mini with a custom prompt that:

Rewrites todos into a natural, conversational summary

Avoids lists or bullet points

Emphasizes task importance and clarity

Produces a Slack-friendly tone
