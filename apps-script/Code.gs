/**
 * Saves survey responses to this Google Sheet.
 *
 * Setup: open the responses sheet, then Extensions > Apps Script. Replace everything
 * with this file, save, then Deploy > New deployment > Web app,
 * "Execute as: Me", "Who has access: Anyone". Copy the /exec URL into assets/config.js.
 *
 * Every response becomes one row on the "Responses" tab. The header row is created
 * automatically and grows if the survey adds new questions later.
 */
var SHEET_NAME = "Responses";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);

    // Spam bots fill in the hidden "website" field; real people never see it.
    if (data.website) return json_({ ok: true });
    delete data.website;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    var header = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];
    if (header.length === 0) {
      header = ["Submitted at"];
    }

    // Add any new columns at the end so older rows keep their place.
    var added = false;
    Object.keys(data).forEach(function (key) {
      if (header.indexOf(key) === -1) { header.push(key); added = true; }
    });
    if (added || sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Skip duplicates: the site may resend the same response if a reply got lost.
    var idCol = header.indexOf("Response ID") + 1;
    if (idCol > 0 && data["Response ID"] && sheet.getLastRow() > 1) {
      var found = sheet.getRange(2, idCol, sheet.getLastRow() - 1, 1)
        .createTextFinder(String(data["Response ID"])).matchEntireCell(true).findNext();
      if (found) return json_({ ok: true, duplicate: true });
    }

    var row = header.map(function (key) {
      if (key === "Submitted at") return new Date();
      var v = data[key];
      return v === undefined || v === null ? "" : v;
    });
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json_({ ok: true, status: "Survey endpoint is running" });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
