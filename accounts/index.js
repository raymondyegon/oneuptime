const express = require('express');
const path = require('path');
const app = express();
const envfile = require('envfile');
const fs = require('fs');
const child_process = require('child_process');
const compression = require('compression');

const env = {
  REACT_APP_FYIPE_HOSTED: process.env.FYIPE_HOSTED,
  REACT_APP_HOST: process.env.HOST,
  REACT_APP_DASHBOARD_HOST: process.env.DASHBOARD_HOST,
  REACT_APP_BACKEND_HOST: process.env.BACKEND_HOST,
  REACT_APP_DOMAIN: process.env.DOMAIN,
  REACT_APP_STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  REACT_APP_AMPLITUDE_PUBLIC_KEY: process.env.AMPLITUDE_PUBLIC_KEY
}

fs.writeFileSync('.env', envfile.stringifySync(env));

child_process.execSync('react-env', {
  stdio: [0, 1, 2]
});

app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/env.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'env.js'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 3003
/* eslint-disable no-console */
console.log(`This project is running on port ${PORT}`)
app.listen(PORT);