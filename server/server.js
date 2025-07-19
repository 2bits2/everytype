const express = require('express');
const { WebSocketServer } = require('ws');
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection;
const http = require('http');
const Database = require('better-sqlite3');

const app = express();
app.use(express.json());

const db = new Database('data.db');
db.exec(`CREATE TABLE IF NOT EXISTS forms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  docId TEXT,
  data JSON
)`);

app.post('/save', (req, res) => {
  const { docId, data } = req.body;
  const stmt = db.prepare('INSERT INTO forms (docId, data) VALUES (?, ?)');
  stmt.run(docId, JSON.stringify(data));
  res.json({ status: 'ok' });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
