const axios = require('axios');

const BASE = 'https://api.paystack.co';
const KEY = process.env.PAYSTACK_SECRET_KEY;
const HEADERS = { Authorization: `Bearer ${KEY}` };

async function getTransactions(perPage = 20) {
  const res = await axios.get(`${BASE}/transaction?perPage=${perPage}`, { headers: HEADERS });
  return res.data;
}

async function getBalance() {
  const res = await axios.get(`${BASE}/balance`, { headers: HEADERS });
  return res.data;
}

module.exports = { getTransactions, getBalance };
