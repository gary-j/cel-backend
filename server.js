const app = require('./app');

// Importing the fs and https modules -------------- STEP 1
const https = require('https');
const fs = require('fs');

// Read the certificate and the private key for the https server options
// ------------------- STEP 2
const options = {
  key: fs.readFileSync('./certificats/server.key'),
  cert: fs.readFileSync('./certificats/server.crt'),
};
//

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;
const PORTSECURED = process.env.PORTSECURED || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// Create the https server by initializing it with 'options'
// -------------------- STEP 3
https.createServer(options, app).listen(PORTSECURED, () => {
  console.log(`HTTPS server started on port ${PORTSECURED}`);
});
