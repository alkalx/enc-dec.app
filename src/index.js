import CryptoJS from 'crypto-js';
import { decryptVideasy } from './videasy-decrypt';
import { decryptHahoy } from './hahoy-decrypt';

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

    // Route handling
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

    // Serve static files
    return env.ASSETS.fetch(request);
  },
};
