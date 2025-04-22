# 🧠 Notion Clone

A full-featured Notion-style workspace and document editor built using modern web technologies. This project enables users to create, manage, and collaborate on rich documents and workspaces — just like the real Notion.

---

## ✨ Features

- 🧾 Create and manage **nested documents** and **workspaces**
- 🔐 Secure **user authentication** via **NextAuth**
- 📦 **Archive** or **publish** documents
- 🧠 Rich, **Notion-like document editor**:
  - Add **text**, **images**, **tables**, **links**, and **columns**
  - Intuitive **/slash command menu**
  - Supports **drag and drop** reordering
  - Embed media and external content
- 💾 **Auto-save** and persist documents in real-time
- 🎨 Themeable UI with **light/dark mode**
- 💅 Styled like **Notion**

---

## 🛠️ Tech Stack

| Tech         | Description                          |
| ------------ | ------------------------------------ |
| Next.js      | Fullstack React Framework            |
| Prisma       | Type-safe ORM for PostgreSQL         |
| PostgreSQL   | Relational Database                  |
| Zustand      | Lightweight state management         |
| Zod          | Type-safe schema validation          |
| NextAuth.js  | User authentication and session mgmt |
| Tailwind CSS | Utility-first CSS framework          |
| shadcn/ui    | UI components built with Tailwind    |
| next-themes  | Dark/light theme management          |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SajalDBansal/notion-nextjs
cd notion-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root directory and add:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret>

# add if wants to active google signin feature
GOOGLE_CLIENT_ID=<GOOGLE GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>

EDGE_STORE_ACCESS_KEY=<EDGE_STORE_ACCESS_KEY>
EDGE_STORE_SECRET_KEY=<EDGE_STORE_SECRET_KEY>

DATABASE_URL=<YOUR POSTGRES URL>
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```
Visit http://localhost:3000 in your browser.

---

## ✅ To-Do / Improvements

- Real-time collaborative editing
- Document version history
- Role-based access for workspace members
- Markdown and shortcut support
- Notifications and activity logs

