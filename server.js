const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Correctly serve static files from the public folder
server.use('/ITC505/lab-7', express.static(path.join(__dirname, 'public/ITC505/lab-7')));

// Default route for the root URL
server.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Mad Lib Adventure Server</h1>
        <p>Navigate to <a href="/ITC505/lab-7/">ITC505 Lab 7</a> to start your adventure.</p>
    `);
});

// Serve index.html explicitly for /ITC505/lab-7/
server.get('/ITC505/lab-7/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/ITC505/lab-7/index.html'));
});

// POST Route for form submission
server.post('/ITC505/lab-7/submit', (req, res) => {
  console.log(req.body); // Log the request body for debugging

  const { hero, creature, weapon, place, action } = req.body;

  if (!hero || !creature || !weapon || !place || !action) {
      return res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out all fields.</p>
          <a href="/ITC505/lab-7/">Go Back to Form</a>
      `);
  }

  const madLib = `
      Brave ${hero} ventured into the mystical ${place} armed with their trusty ${weapon}.
      There, they encountered a fierce ${creature} and decided to ${action} it.
      The day ended with ${hero}'s name echoing through history as a legendary hero!
  `;

  res.send(`
      <h1>Your Adventure</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/">Create Another Adventure</a>
  `);
});

// Catch-all route for undefined paths
server.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go to Home</a>
    `);
});

// Start the server
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
