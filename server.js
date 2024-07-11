// server.js

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const port = 3005;
const apiKey = process.env.API_KEY;

app.use(cors());

app.get('/:playerTag', async (req, res) => {
  const playerTag = req.params.playerTag;

  try {
    const response = await axios({
      method: 'get',
      url: `https://api.brawlstars.com/v1/players/%23${playerTag}`,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const playerData = response.data;

    // Get the player icon from the Brawl Stars API
    const playerIconId = playerData.icon.id;
    const playerIconUrl = `https://cdn-old.brawlify.com/profile/${playerIconId}.png`; // Assuming this endpoint provides the icon URL

    playerData.imageUrl = playerIconUrl; // Add imageUrl to playerData

    res.send(playerData);
  } catch (error) {
    console.log(error);
    res.status(404).send('Player Not Found');
  }
});

app.get('/', (req, res) => {
  res.send('Send Player Tag in URL');
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
