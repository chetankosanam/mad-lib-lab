const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { name, adjective, noun, verb, place } = req.body;
    if (!name || !adjective || !noun || !verb || !place) {
        res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out ALL fields</p>
          <a href="/">Go Back to Form</a>
        `);
        return;
    }
    const madLib = `Once upon a time, ${name} went to a ${adjective} ${place}. They brought along their favorite ${noun}, and everyone watched them ${verb}.`;
    res.send(`
      <h1>Your Mad Lib!</h1>
      <p>${madLib}</p>
      <a href="/ITC505/lab-7/index.html">Create Another Mad Lib</a>
    `);
});

// Static File Serving
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// Port Setup
let port = process.argv[2] === 'local' ? 8080 : 80;
server.listen(port, () => console.log('Server running on localhost:', port));
