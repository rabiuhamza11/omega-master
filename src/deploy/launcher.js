const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN_2 || process.env.VERCEL_TOKEN;
const RENDER_API_KEY = process.env.RENDER_API_KEY;
const OWNER = 'rabiuhamza11';

const HEADERS_GH = {
  Authorization: `token ${GITHUB_TOKEN}`,
  'User-Agent': 'OmegaMaster/1.0',
  Accept: 'application/vnd.github.v3+json'
};

async function deployToVercel(repoName) {
  try {
    const userRes = await axios.get('https://api.vercel.com/v2/user', {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }
    });
    const teamId = userRes.data?.user?.defaultTeamId;
    const qs = teamId ? `?teamId=${teamId}` : '';
    const res = await axios.post(
      `https://api.vercel.com/v9/projects${qs}`,
      { name: repoName, gitRepository: { type: 'github', repo: `${OWNER}/${repoName}` }, framework: null },
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}`, 'Content-Type': 'application/json' } }
    );
    return { ok: true, platform: 'Vercel', url: `https://${repoName}.vercel.app` };
  } catch (err) {
    return { ok: false, error: err.response?.data?.error?.message || err.message };
  }
}

async function redeployRender(serviceId) {
  try {
    const res = await axios.post(
      `https://api.render.com/v1/services/${serviceId}/deploys`,
      {},
      { headers: { Authorization: `Bearer ${RENDER_API_KEY}`, 'Content-Type': 'application/json' } }
    );
    return { ok: true, deployId: res.data?.id };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

module.exports = { deployToVercel, redeployRender };
