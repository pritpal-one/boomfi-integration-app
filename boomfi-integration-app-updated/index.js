require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-payment', async (req, res) => {
  const { name, amount, currency, chain, wallet_address } = req.body;

  try {
    const response = await fetch('https://api.boomfi.xyz/v1/payment-links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BOOMFI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, amount, currency, chain, wallet_address })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
