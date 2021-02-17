const fetch = require('node-fetch');
require('dotenv').config();

fetch('https://replatore.com', {
  method: 'POST',
  headers: {
    authentication: process.env.API_KEY_CHANNELS,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ query: '{channel {title}}' }),
})
  .then((response) => response.json())
  .then((data) => console.log('data returned:', data))
  .catch((error) => console.log(error));
