import express from 'express';
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Global variables
const envelopes = {};

// Endpoint to create envelopes
app.post('/envelopes', (req, res) => {
  const { name, amount } = req.body;

  if (!name || !amount) {
    return res.status(400).json({ error: 'Name and amount are required' });
  }

  envelopes[name] = amount;

  res.status(201).json({ message: `Envelope '${name}' created with $${amount}` });
});

// Existing route (you can keep this or modify as needed)
app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!\n`);
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
