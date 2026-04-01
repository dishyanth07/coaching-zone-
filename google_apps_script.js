// Coaching Zone Google Sheets Sync Webhook Script (V2 - Bulk Support)
// Copy this into your Google Sheet's Extensions > Apps Script editor.

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.type; 
    var payload = data.payload;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(type.charAt(0).toUpperCase() + type.slice(1));
    
    if (!sheet) {
      sheet = ss.insertSheet(type.charAt(0).toUpperCase() + type.slice(1));
      if (Array.isArray(payload) && payload.length > 0) {
        sheet.appendRow(Object.keys(payload[0]));
      } else {
        sheet.appendRow(Object.keys(payload));
      }
    }
    
    // Handle Array (Bulk Insert) or Single Object
    if (Array.isArray(payload)) {
      payload.forEach(function(row) {
        sheet.appendRow(Object.values(row));
      });
    } else {
      sheet.appendRow(Object.values(payload));
    }
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
