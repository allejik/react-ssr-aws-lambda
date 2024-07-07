import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    createRoot(document.getElementById('root')).render(<App/>);
} else {
    hydrateRoot(document.getElementById('root'), <App/>);
}