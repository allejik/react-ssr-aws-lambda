import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../App';

export const handler = async (event, context) => {
    const app = ReactDOMServer.renderToString(<App />);
    const html = `<script defer src="${process.env.FRONTEND_MAIN_SCRIPT_PATH}"></script><div id="root">${app}</div>`;

    return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html,
    };
};