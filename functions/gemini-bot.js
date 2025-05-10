const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

exports.handler = async (event, context) => {
  const userMessage = JSON.parse(event.body).message || "Merhaba";

  const auth = new GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });

  const client = await auth.getClient();

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const response = await client.request({
    url,
    method: 'POST',
    data: {
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ]
    }
  });

  const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Yanıt alınamadı";

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: result })
  };
};
