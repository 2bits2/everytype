import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
if (!container) throw new Error('No root element');

const root = createRoot(container);
root.render(<App />);
