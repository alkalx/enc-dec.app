import CryptoJS from 'crypto-js';
import { decryptVideasy } from './videasy-decrypt';
import { decryptHahoy } from './hahoy-decrypt';

// Static HTML content
const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KalStream Decryption API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 900px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; margin-bottom: 30px; }
        .endpoint {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        code {
            background: #2d3748;
            color: #68d391;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #2d3748;
            color: #68d391;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin-top: 10px;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔓 KalStream Decryption API</h1>
        <p>Decryption service for Videasy and Hahoy providers</p>
        
        <div class="endpoint">
            <h2>Videasy Decryption</h2>
            <p><strong>Endpoint:</strong> <code>POST /api/dec-videasy</code></p>
            <pre>{ "text": "encrypted_string", "id": "tmdb_id" }</pre>
        </div>

        <div class="endpoint">
            <h2>Hahoy Decryption</h2>
            <p><strong>Endpoint:</strong> <code>POST /api/dec-hahoy</code></p>
            <pre>{ "text": "encrypted_string" }</pre>
        </div>

        <div class="endpoint">
            <h2>Response Format</h2>
            <pre>{ "status": 200, "result": { "sources": [...], "subtitles": [...] } }</pre>
        </div>

        <a href="/test.html">🧪 Test API</a>
    </div>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // API Routes
    if (url.pathname === '/api/dec-videasy' && request.method === 'POST') {
      try {
        const body = await request.json();
        const result = await decryptVideasy(body.text, body.id);
        return new Response(JSON.stringify({ status: 200, result }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ status: 500, error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/api/dec-hahoy' && request.method === 'POST') {
      try {
        const body = await request.json();
        const result = await decryptHahoy(body.text);
        return new Response(JSON.stringify({ status: 200, result }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ status: 500, error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Serve test page
    if (url.pathname === '/test.html' || url.pathname === '/test') {
      const testPageUrl = 'https://raw.githubusercontent.com/alkalx/enc-dec.app/main/public/test.html';
      const response = await fetch(testPageUrl);
      const html = await response.text();
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Serve index page
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(INDEX_HTML, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // 404
    return new Response('Not Found', { status: 404 });
  },
};
