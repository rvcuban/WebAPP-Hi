const express = require('express');
const axios = require('axios');
const path = require('path');

const Sentiment = require('sentiment');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());  // Añade esta línea

const OpenAI = require('openai');

const openai = new OpenAI('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');

const sentiment = new Sentiment();







app.post('/api/analyze-message', async (req, res) => {
  const { message } = req.body;
  try {
      // Realizar análisis de sentimientos
      const sentimentAnalysis = sentiment.analyze(message);
      const sentimentScore = sentimentAnalysis.score;  // e.g., positive score indicates positive sentiment

      // Ajustar la temperatura basada en el análisis de sentimientos
      const temperature = sentimentScore >= 0 ? 0.7 : 1.0;

      const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          temperature: temperature  // Utilizar la temperatura ajustada
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`
          }
      });
      let analysis = gptResponse.data.choices[0].message.content.trim();
      res.send({ analysis });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});









app.use(express.static(path.join(__dirname, 'mi-app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'mi-app/build', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Main_Database_Hi',
    password: 'Legnajavier123',
    port: 5432,
});







client.connect();