import { useState } from 'react';
import axios from 'axios';

const SendForm = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const send = async () => {
    await axios.post('/transfer/send', { phone, amount }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    });
    alert('Sent');
  };

  return (
    <div>
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Amount (ETH)" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
};

export default SendForm;
