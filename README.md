# Node + Express Envelope Budget API

This is a simple API in Node.js with express.js built on Google Project IDX, for the Codecademy Portfolio Project "Personal Budget Part 1".

## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```

## Using the API

The API consists of a series of simple endpoints to track envelope names and amounts. The envelopes are stored with `name` and `amount` properties. 

### Add envelope
```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "Food", "amount": 100}' http://localhost:3000/envelopes
```

### Get all envelopes
```sh
curl http://localhost:3000/envelopes
```

### Get a specific envelope
```sh
curl http://localhost:3000/envelopes/[name]
```

### Update a specific envelope
```sh
curl -X PUT -H "Content-Type: application/json" -d '{"newName": "Food", "newAmount": 200}' http://localhost:3000/envelopes/[name]
```

### Delete a specific envelope
```sh
curl -X DELETE http://localhost:3000/envelopes/[name]
```

### Transfer value between envelopes
```sh
curl -X POST -H "Content-Type: application/json" -d '{"from": "Food", "to": "Bills", "amount": 50}' http://localhost:3000/envelopes/transfer
```