
const axios = require("axios");

exports.handler = async function (event, context) {
  const API_KEY = "AIzaSyDtb_39cu67ipoh3XpCPe-amYO9tAkrldc";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const body = JSON.parse(event.body);
  const message = body.message || "Merhaba";

  try {
    const response = await axios.post(url, {
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Gemini'den yanıt alınamadı.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error.response?.data || "Bilinmeyen hata",
      }),
    };
  }
};
