require('dotenv').config();
const express = require('express');
const { runHealthCheck } = require('./monitor/health');
const { getEcosystemStatus } = require('./core/orchestrator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'OMEGA MASTER',
    version: '1.0.0',
    status: 'online',
    owner: 'Rabiu Hamza Mohammed',
    platforms: 13,
    message: 'Supreme AI Command Hub — Harz Ecosystem'
  });
});

app.get('/health', async (req, res) => {
  const results = await runHealthCheck();
  res.json(results);
});

app.get('/status', async (req, res) => {
  const status = await getEcosystemStatus();
  res.json(status);
});

app.listen(PORT, () => {
  console.log(`OMEGA MASTER v1.0.0 — Port ${PORT} — Online`);
});
