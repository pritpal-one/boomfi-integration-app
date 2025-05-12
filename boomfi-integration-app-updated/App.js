import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [link, setLink] = useState('');

  const createPayment = async () => {
    try {
      const res = await axios.post('https://boomfi-api.onrender.com/api/create-payment', {
        name: 'Demo Payment',
        amount: '20',
        currency: 'USDC',
        chain: 'polygon',
        wallet_address: '0xYourWalletAddressHere'
      });

      setLink(res.data.payment_link_url || '');
    } catch (err) {
      console.error('Error creating payment link', err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Boomfi Crypto Payment</h2>
      <button onClick={createPayment}>Create Payment Link</button>
      {link && (
        <p>
          <a href={link} target="_blank" rel="noreferrer">Pay Now</a>
        </p>
      )}
    </div>
  );
}

export default App;
