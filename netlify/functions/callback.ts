import type { Handler } from '@netlify/functions';

const GITHUB_CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const handler: Handler = async (event) => {
  // Get authorization code from query params
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization code is required' }),
    };
  }

  try {
    // Exchange code for access token with GitHub
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
        token_type: tokenData.token_type,
      }),
    };
  } catch (error) {
    console.error('OAuth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to authenticate with GitHub',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
