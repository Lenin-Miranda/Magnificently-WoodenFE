# Magnificently Wooden Frontend

Next.js commerce interface with product browsing, account pages, cart/checkout UI and administrative pages. Built with React, TypeScript, Axios and Tailwind CSS.

**API:** [Magnificently-WoodenBE](https://github.com/Lenin-Miranda/Magnificently-WoodenBE), a separate Django/PostgreSQL service.

## Local setup

Requires Node.js, npm and the backend for data-backed workflows.

```bash
git clone https://github.com/Lenin-Miranda/Magnificently-WoodenFE.git
cd Magnificently-WoodenFE
npm install
```

Create `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the Django API, then run `npm run dev` and open [localhost:3000](http://localhost:3000). The URL must include `/api`; configure the matching frontend origin in the backend's CORS settings.

## Commands

- `npm run dev`: development server.
- `npm run lint`: ESLint.
- `npm run build`: production build.
- `npm start`: serve a completed production build.

## Code map

- [app/](app/): routes and page components.
- [app/lib/axios.ts](app/lib/axios.ts): API base URL.
- `app/lib/`: authentication, product, cart and user-profile requests.
- `app/interfaces/`: shared data types.

## Verification and scope

Run lint/build and check catalog, account and cart screens against your local API. UI pages alone do not guarantee that payments or every commerce workflow are complete. There is no automated test script in this package.
