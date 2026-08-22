// Paste this into script.google.com (bound to the order Sheet), then deploy
// as a Web App. See GOOGLE_SHEETS_SETUP.md for step-by-step instructions.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders') ||
              SpreadsheetApp.getActiveSpreadsheet().insertSheet('Orders');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Address', 'City', 'State', 'PIN', 'Quantity', 'Landmark']);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.address || '',
    data.city || '',
    data.state || '',
    data.pin || '',
    data.qty || '',
    data.landmark || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
