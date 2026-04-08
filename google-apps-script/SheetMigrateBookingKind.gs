/**
 * One-time migration for the Sheet bound to your booking Apps Script project.
 * Run ONCE before (or right after) deploying BookingWebApp.production.gs.
 *
 * What it does:
 * 1. Sets row 1, column O header to "bookingKind" if that cell is empty.
 * 2. Fills column O with "service" for every data row (row 2+) where O is blank.
 *
 * Column layout must match logBooking(): … status (M), timestamp ISO (N), bookingKind (O).
 *
 * How to run: Apps Script editor → select function `migrateAddBookingKindColumn` → Run.
 * Authorize when prompted. Then you can delete this file from the project or leave it.
 */

var MIGRATE_SHEET_NAME = 'Sheet1';
/** 15 = column O — last column after N (timestamp) */
var MIGRATE_BOOKING_KIND_COL = 15;
var MIGRATE_BOOKING_KIND_HEADER = 'bookingKind';

function migrateAddBookingKindColumn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(MIGRATE_SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet not found: ' + MIGRATE_SHEET_NAME);
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 1) {
    Logger.log('Sheet is empty; nothing to migrate.');
    return;
  }

  var headerCell = sheet.getRange(1, MIGRATE_BOOKING_KIND_COL);
  if (!headerCell.getValue()) {
    headerCell.setValue(MIGRATE_BOOKING_KIND_HEADER);
  }

  if (lastRow < 2) {
    Logger.log('Header only; no data rows to backfill.');
    return;
  }

  var colRange = sheet.getRange(2, MIGRATE_BOOKING_KIND_COL, lastRow, MIGRATE_BOOKING_KIND_COL);
  var existing = colRange.getValues();
  var out = [];
  var filled = 0;
  for (var i = 0; i < existing.length; i++) {
    var v = existing[i][0];
    if (v === '' || v === null || v === undefined) {
      out.push(['service']);
      filled++;
    } else {
      out.push([v]);
    }
  }
  colRange.setValues(out);

  var msg = 'bookingKind column OK. Backfilled ' + filled + ' row(s) with "service"; left existing values unchanged.';
  Logger.log(msg);
  ss.toast(msg, 'JusLawns migrate', 8);
}

/**
 * Optional: add a Sheets menu to run migration (only add if you do not already use onOpen).
 *
 * function onOpen() {
 *   SpreadsheetApp.getUi()
 *     .createMenu('JusLawns tools')
 *     .addItem('Migrate: add bookingKind column', 'migrateAddBookingKindColumn')
 *     .addToUi();
 * }
 */
