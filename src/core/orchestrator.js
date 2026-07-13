const axios = require('axios');

const PLATFORMS = [
  { name: 'HarzDM', url: 'https://harzdm-marketplace.vercel.app' },
  { name: 'OMEGA INFINITY', url: 'https://omega-infinity-dashboard.vercel.app' },
  { name: 'TradeOS', url: 'https://tradeos-dashboard-fawn.vercel.app' },
  { name: 'Abuja Estate City', url: 'https://abuja-estate-city-ai.vercel.app' },
  { name: 'Maganu Agent', url: 'https://maganu-agent.onrender.com' },
];

async function getEcosystemStatus() {
  const results = await Promise.allSettled(
    PLATFORMS.map(async (p) => {
      const start = Date.now();
      try {
        const res = await axios.get(p.url, { timeout: 8000 });
        return { name: p.name, url: p.url, status: 'online', ms: Date.now() - start, code: res.status };
      } catch (err) {
        return { name: p.name, url: p.url, status: 'offline', error: err.message };
      }
    })
  );

  const statuses = results.map(r => r.value || r.reason);
  const online = statuses.filter(s => s.status === 'online').length;

  return {
    timestamp: new Date().toISOString(),
    summary: `${online}/${PLATFORMS.length} platforms online`,
    platforms: statuses
  };
}

module.exports = { getEcosystemStatus, PLATFORMS };
