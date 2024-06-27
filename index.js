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

// Endpoint to GET all envelopes
app.get('/envelopes', (req, res) => {
  res.json(envelopes);
});

// Endpoint to GET a specific envelope
app.get('/envelopes/:name', (req, res) => {
  const envelopeName = req.params.name;
  const envelope = envelopes[envelopeName];

  if (!envelope) {
    return res.status(404).json({ error: `Envelope '${envelopeName}' not found` });
  }

  res.json({ name: envelopeName, amount: envelope });
});

// Endpoint to UPDATE a specific envelope
app.put('/envelopes/:name', (req, res) => {
  const envelopeName = req.params.name;
  const { newName, newAmount } = req.body;

  if (!envelopes[envelopeName]) {
    return res.status(404).json({ error: `Envelope '${envelopeName}' not found` });
  }

  if (newName) {
    envelopes[newName] = envelopes[envelopeName];
    delete envelopes[envelopeName];
  }

  if (newAmount) {
    if (newName) {
      envelopes[newName] = newAmount;
    } else {
      envelopes[envelopeName] = newAmount;
    }
  }

  res.json({ 
    message: `Envelope '${envelopeName}' updated`,
    ...(newName && { newName }),
    ...(newAmount && { newAmount }) 
  });
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
