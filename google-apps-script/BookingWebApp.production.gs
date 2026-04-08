/**
 * JusLawns booking web app — production-style script with service vs general callback.
 * Deploy as Web app; paste into your Apps Script project (bound to the Sheet) and replace
 * your previous doPost/doGet and helpers, or merge carefully if you added custom columns.
 *
 * Sheet row: adds bookingKind as the LAST column (after ISO timestamp). Add a header row
 * cell if you use headers (e.g. "bookingKind").
 */

const CALENDAR_ID = 'primary'; // uses the account's main calendar
const MAX_SLOTS_PER_DAY = 12;
const SHEET_NAME = 'Sheet1';

/** Calendar event colors: 10 = green, 7 = peacock */
const COLOR_SERVICE_BOOKING = '10';
const COLOR_GENERAL_CALLBACK = '7';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const kind = normalizeBookingKind_(data.bookingKind);

    const remaining = getRemainingSlots(data.date);
    if (remaining <= 0) {
      return jsonResponse({ success: false, error: 'No slots available for this date.' });
    }

    const confirmationId = 'JL-' + new Date().getTime().toString(36).toUpperCase();

    createCalendarEvent(data, confirmationId, kind);
    logBooking(data, confirmationId, kind);

    return jsonResponse({ success: true, confirmationId: confirmationId, remaining: remaining - 1 });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  const date = e.parameter.date;
  if (!date) {
    return jsonResponse({ error: 'Missing date parameter' });
  }
  const remaining = getRemainingSlots(date);
  return jsonResponse({ remaining: remaining });
}

function getRemainingSlots(dateStr) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  var count = 0;
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === dateStr) count++;
  }
  return MAX_SLOTS_PER_DAY - count;
}

function normalizeBookingKind_(raw) {
  var k = (raw || 'service').toString().toLowerCase().trim();
  return k === 'general' ? 'general' : 'service';
}

function buildBookingCalendarTitle_(payload, kind) {
  if (kind === 'general') {
    return 'JusLawns — Callback / questions (not a service booking)';
  }

  var raw = (payload.service || '').toString().trim();
  if (!raw) return 'JusLawns — Booking request';

  var services = raw.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
  if (services.length === 0) return 'JusLawns — Booking request';

  var title = 'JusLawns — ' + services.join(' · ');
  if (title.length > 120) {
    title = title.substring(0, 117) + '…';
  }
  return title;
}

function buildBookingCalendarDescription_(payload, confirmationId, kind) {
  var lines = [];

  lines.push('Confirmation: ' + confirmationId);
  lines.push('');

  if (kind === 'general') {
    lines.push('REQUEST TYPE: General callback (not a lawn service booking)');
    lines.push('Follow up by phone/email — not a crew dispatch unless you schedule one later.');
    lines.push('');
  }

  lines.push('SERVICES');
  var raw = (payload.service || '').toString().trim();
  var services = raw
    ? raw.split(',').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; })
    : [];

  if (services.length === 0) {
    lines.push('(none specified)');
  } else {
    for (var i = 0; i < services.length; i++) {
      lines.push('• ' + services[i]);
    }
  }

  lines.push('');
  lines.push('CUSTOMER');
  lines.push('Name: ' + (payload.firstName || '') + ' ' + (payload.lastName || ''));
  lines.push('Phone: ' + (payload.phone || ''));
  lines.push('Email: ' + (payload.email || ''));
  lines.push('');
  lines.push('ADDRESS');
  lines.push((payload.street || '') + ', ' + (payload.city || '') + ' ' + (payload.zip || ''));

  var notes = (payload.notes || '').toString().trim();
  lines.push('');
  lines.push('NOTES / ACCESS');
  lines.push(notes || 'None');

  lines.push('');
  lines.push('Preferred date: ' + (payload.date || ''));

  return lines.join('\n');
}

function createCalendarEvent(data, confirmationId, kind) {
  var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  var date = new Date(dateStr(data.date));

  var title = buildBookingCalendarTitle_(data, kind);
  var description = buildBookingCalendarDescription_(data, confirmationId, kind);

  var event = calendar.createAllDayEvent(title, date, { description: description });
  event.setColor(kind === 'general' ? COLOR_GENERAL_CALLBACK : COLOR_SERVICE_BOOKING);
}

function logBooking(data, confirmationId, kind) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var status = 'submitted';
  var bookingKind = kind === 'general' ? 'general' : 'service';

  sheet.appendRow([
    confirmationId,
    data.date,
    data.service,
    data.firstName,
    data.lastName,
    data.phone,
    data.email,
    data.street,
    data.city,
    data.zip,
    data.notes || '',
    data.paymentMethod || '',
    status,
    new Date().toISOString(),
    bookingKind,
  ]);
}

function dateStr(d) {
  return d + 'T00:00:00';
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
