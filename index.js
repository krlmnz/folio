const { google } = require('googleapis');
// Ensure this path points to your actual credentials JSON file
const credentials = require('./credentials.json');

async function accessSpreadsheet() {
  const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  const sheets = google.sheets({ version: 'v4', auth: client });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1xl3iN_Iz4BqocURDkLV5396roaXnf7Xe4g01tR0IO5M',
    range: 'Sheet1',
  });

  const rows = response.data.values;
  if (rows.length) {
    console.log(rows);
  } else {
    console.log('No data found.');
  }
}

accessSpreadsheet();
