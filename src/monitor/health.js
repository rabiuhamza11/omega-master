const { getEcosystemStatus } = require('../core/orchestrator');

async function runHealthCheck() {
  console.log('OMEGA MASTER — Running ecosystem health check...');
  const status = await getEcosystemStatus();
  console.log('Summary:', status.summary);
  status.platforms.forEach(p => {
    const icon = p.status === 'online' ? '✅' : '❌';
    console.log(`${icon} ${p.name} — ${p.status} ${p.ms ? `(${p.ms}ms)` : ''}`);
  });
  return status;
}

if (require.main === module) {
  runHealthCheck().then(() => process.exit(0));
}

module.exports = { runHealthCheck };
