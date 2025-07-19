const esbuild = require('esbuild');
const express = require('express');
const path = require('path');

const app = express();

esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'index.tsx')],
  bundle: true,
  outfile: path.join(__dirname, '../public/bundle.js'),
  platform: 'browser',
  format: 'esm',
  loader: { '.ts': 'ts', '.tsx': 'tsx' },
  jsx: 'automatic',
});

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.CLIENT_PORT || 3000;
app.listen(PORT, () => console.log('Client running on port', PORT));
