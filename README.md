<p align="center">
  <img src="./src/app/icon.svg" height="120px" width="120px"/>
</p>
<h1 align="center">Age of Fallen Empires</h1>

This code is full stack app for the __Age of Fallen Empires__, a homebrew setting for [Pathfinder 2e](https://paizo.com/pathfinder). The app is written in Next.js, using TypeScript, and deployed to Vercel.

### Tech stack

- Next.js framework
- Based on React
- Using TypeScript
- CSS powered by Tailwind
- Storing data in Postgres database
- Deployed to Vercel
- Authenticated via Auth0

## Setting up the app locally

First, create .env file in the root folder of the app, containing followind variables:

```
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
DATABASE_PORT=
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_HOST=
POSTGRES_HOSTNAME=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
LOCAL_DATABASE_URL=
```

Next, set up database locally. Open the app folder and run

```bash
cd src/db
docker compose up -d
```

Next, run migrations using command

```bash
npm run migrate
```

Restore all node packages running

```bash
npm run install
```

And run the app in development mode using

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
