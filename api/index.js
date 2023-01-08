/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';
import leaderBoard from '../db/leaderBoard.json';
import teams from '../db/teams.json';
import presidents from '../db/presidents.json';

const app = new Hono();

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns the kings league leaderboard',
    },
    {
      endpoint: '/teams',
      description: 'Returns the kings league teams',
    },
    {
      endpoint: '/presidents',
      description: 'Returns the kings league presidents',
    },
  ])
);

app.get('/leaderboard', (ctx) => ctx.json(leaderBoard));

app.get('/presidents', (ctx) => ctx.json(presidents));

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id');
  const foundPresident = presidents.find((president) => president.id === id);
  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ message: 'President not found' }, 404);
});

app.get('/teams', (ctx) => ctx.json(teams));

app.get('/static/*', serveStatic({ root: './' }));

export default app;
