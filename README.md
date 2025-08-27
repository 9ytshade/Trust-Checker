# TRUST CHECKER

TRUST CHECKER is a Web3 application that helps you measure and record trust between wallets. It gives you a simple way to view how much trust others assign to an address, and it allows you to add your own input.

## What it does

- Lets you scan any wallet and see its trust score.
- Shows how much of that score comes from shared mutuals.
- Gives you a slider to add your own trust level for the wallet.
- Displays results in a clean and Intuition-themed interface.

## Why it matters

Blockchains record transactions but do not record reputation. Intuition changes this by creating a knowledge graph of structured claims and trust relationships. With TRUST CHECKER, you can see and contribute to that data in a way that is useful for real activity.

A trust checker has clear uses:
- In DAOs, you can identify delegates you find credible.
- In DeFi, you can decide whether to trust a counterparty in an OTC trade.
- In NFT markets, you can check the history of a buyer or seller.
- In social platforms, you can build your own circle of trusted peers.

## Current stage

The application uses dummy data for now. Once Intuition Protocol v2 goes live, the project will connect to the Intuition knowledge graph and display real trust data.

## How to use

1. Enter a wallet address.
2. View the trust score, mutual links, and claims.
3. Use the slider to add your own score.
4. Your input becomes part of the growing graph once the backend connects to Intuition.

## Technical details

- Built with React and Tailwind CSS.
- Backend will integrate Intuition Protocol v2.
- Designed for deployment on Vercel or Netlify.

## Next steps

- Link the project to Intuition Protocol v2 APIs.
- Deploy a live demo.
- Add stronger visualization features, such as graphs of connections.
- Extend support to multiple chains.

## Contributing

You can contribute by testing the interface, giving design feedback, or helping with integration once the protocol v2 APIs are available. The aim is to make trust a measurable tool for every Web3 user.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/nightshades/v0-wallet-reputation-checker)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/BrtFTjSOAr5)

## Deployment

Your project is live at:

**[https://vercel.com/nightshades/v0-wallet-reputation-checker](https://vercel.com/nightshades/v0-wallet-reputation-checker)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/BrtFTjSOAr5](https://v0.app/chat/projects/BrtFTjSOAr5)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
