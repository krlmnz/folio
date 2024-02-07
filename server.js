const express = require('express');
const app = express();

const { google } = require('googleapis');
const credentials = require('./credentials.json');

app.get('/api/sheetData', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1xl3iN_Iz4BqocURDkLV5396roaXnf7Xe4g01tR0IO5M',
      range: 'Sheet1', // Adjust based on your sheet's name and range you want to read.
    });

    const rows = response.data.values;
    if (rows.length) {
      // Send the rows back as JSON
      res.json(rows);
    } else {
      res.json({ message: 'No data found.' });
    }
  } catch (error) {
    console.error('The API returned an error: ' + error);
    res.json({ error: 'The API returned an error: ' + error });
  }
});

