
const axios = require("axios");

exports.handler = async function (event, context) {
  const API_KEY = "AIzaSyA5GPprmi9Fv9wIUbVy7Z06bsIQKvcUnAU";
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${API_KEY}`;

  try {
    const body = JSON.parse(event.body);
    const message = body.message || "Merhaba";

    const response = await axios.post(url, {
      contents: [
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Gemini'den yanıt alınamadı.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("💥 HATA:", error.message);
    console.error("🔍 DETAY:", error.response?.data);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error.response?.data || "Bilinmeyen sunucu hatası"
      })
    };
  }
};
