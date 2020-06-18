const express = require('express');
const http = require('http');
const path = require('path');


const app = express();
const server = http.createServer(app);

const {PORT} = process.env;

app.use(express.static(path.resolve("../client/build/")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/build/index.html"));
});


(async function start() {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
